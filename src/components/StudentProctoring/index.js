import React, { Component } from 'react';
import ScreenCapture from './ScreenCapture';
import Webcam from './Webcam';
import ProctoringTerms from './ProctoringTerms';
import GetPrivileges from './GetPrivileges';
import TakeReferenceImage from './TakeReferenceImage';
import Recording from './Recording';
import EndOfTest from './EndOfTest';

import { thresholdVoice, getAudioThumbprint } from "./audio";
import {proctoringEndProctorSession, proctoringSubmitProctorData, submitAudio} from '../../store/axios';
import editIcon from '../../Assets/images/edit-icon.png';

class StudentProctoring extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.location.state,
            state: 'TERMS',
            webcamPrivilege: false,
            screenshotPrivilege: false,
            microphoneStream: null,
            captureInterval: null,
            calibratedDBThreshold: -50, // this is in dBFS (not the conventional dBSPL)
        };

        this.webcamRef = React.createRef();
        this.screenCaptureRef = React.createRef();
        this.microphoneRef = React.createRef();

        this.handleAgreeToTerms = this.handleAgreeToTerms.bind(this);
        this.handleWebcamPrivilegeGranted = this.handleWebcamPrivilegeGranted.bind(this);
        this.handleScreenCapturePrivilegeGranted = this.handleScreenCapturePrivilegeGranted.bind(this);
        this.handleWebcamError = this.handleWebcamError.bind(this);
        this.handlePrivilegesGranted = this.handlePrivilegesGranted.bind(this);
        this.handleReferenceImageTaken = this.handleReferenceImageTaken.bind(this);
        this.handleEndRecording = this.handleEndRecording.bind(this);
        this.goToStudentDashboard = this.goToStudentDashboard.bind(this);
        this.restart = this.restart.bind(this);

        this.startRecording = this.startRecording.bind(this);
        this.capture = this.capture.bind(this);
        this.endTest = this.endTest.bind(this);

        // TODO - call calibration on terms step
        // TODO - call monitoring when testing
        this.calibrateAudioBaseline().then(( averageDB ) => {
           this.monitorAudio(averageDB);
        });
    }

    componentWillUnmount() {
        if (this.state.captureInterval) {
            clearInterval(this.state.captureInterval);
        }
    }

    handleAgreeToTerms() {
        this.setState({
            ...this.state,
            state: 'PRIVILEGES',
        });
    }

    handleWebcamPrivilegeGranted() {
        this.setState({
            ...this.state,
            webcamPrivilege: true,
        });
    }

    async handleClickEnableMicrophone() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            this.setState({ microphoneStream: stream });
        }
        catch (error) {
            console.error(error);
        }
    }

    handleWebcamError(error) {
        this.setState({
            ...this.state,
            webcamPrivilege: false,
        });
    }

    handleScreenCapturePrivilegeGranted() {
        this.setState({
            ...this.state,
            screenshotPrivilege: true,
        });
    }


    handlePrivilegesGranted() {
        this.setState({
            ...this.state,
            state: 'REFERENCE',
        });
    }

    handleReferenceImageTaken() {
        // this.setState({
        //     ...this.state,
        //     state: 'RECORDING',
        // });
        
        this.startRecording();
    }

    handleEndRecording() {
        clearInterval(this.state.captureInterval);

        this.setState({
            ...this.state,
            state: 'END',
        });
    }

    goToStudentDashboard() {
        this.props.history.push('/student/dashboard');
    }

    restart() {
        this.startRecording();
    }

    startRecording() {
        let interval = 10 * 1000;

        if (this.state.proctorConfiguration && this.state.proctorConfiguration.webcamInterval) {
            interval = this.state.proctorConfiguration.webcamInterval * 1000;
        }

        const captureInterval = setInterval(this.capture, interval);

        this.setState({
            ...this.state,
            captureInterval,
            state: 'RECORDING',
        });

        this.capture();
    }

    calibrateAudioBaseline() {
        // record through t
        if (!navigator.getUserMedia)
          navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        if (navigator.getUserMedia) {
          return navigator.mediaDevices
            .getUserMedia({ audio: { echoCancellation: true, noiseSupression: true } })
            .then((stream) => {
              return getAudioThumbprint(stream);
            }).then((averageDB) => {
              console.log("CALIBRATION READING TAKEN", `${ averageDB } dBFS`)
              this.setState({ calibratedDBThreshold: averageDB });
              return averageDB;
          });
        }
    };


  async submitCurrentAudio(proctorDetailsId) {
    if (!this.state.audioRecorder) return;
    
    this.state.audioRecorder.requestData();

    const fd = new FormData();
    fd.append("audio", this.state.audioBlob);

    return submitAudio(fd, proctorDetailsId);
  }

  monitorAudio(dBThreshold) {
    // determines what permissions the user has
    if (!navigator.getUserMedia)
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: { echoCancellation: true, noiseSupression: true } })
        .then((stream) => {
          const voiceEvents = thresholdVoice(stream, {
            threshold: dBThreshold || -50,
          });

          const recorder = new MediaRecorder(stream);

          recorder.onstop = function (e) {
            console.log("done recording");
          };

          recorder.ondataavailable = (e) => {
            // const newChunks = [...this.state.audioChunks, e.data];
            // this.setState({ audioChunks: newChunks });
            this.setState({ audioBlob: e.data });
          };

          recorder.start();
          this.setState({ audioRecorder: recorder });

          voiceEvents.on("speaking", () => {
            console.log("VOICE DETECTION: SPEAKING");
          });
          voiceEvents.on("stopped_speaking", () => {
            console.log("VOICE DETECTION: STOPPED SPEAKING");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("getUserMedia not supported in this browser.");
    }
  }
    imageIsAllBlack(image) {
        const dataStart = image.indexOf('/AJV');
        const dataEnd = image.indexOf('//9k');

        if (dataStart === -1 || dataEnd === -1 || dataEnd < dataStart) {
            return false;
        }

        const data = image.slice(dataStart + 4, dataEnd);

        for (const datum of data) {
            if (datum !== 'A')
                return false;
        }

        return true;
    }

    async capture() {
        let webcamImage = this.webcamRef.current.getImage();
        let screenshotImage = await this.screenCaptureRef.current.takeScreenshot();

        const webcamDisabled = this.imageIsAllBlack(webcamImage);
        const screenCaptureDisabled = this.imageIsAllBlack(screenshotImage);

        const requestResponse = await proctoringSubmitProctorData({
            proctorSessionId: this.state.proctorSession._id, 
            webcamImage, 
            screenshotImage,
        });

        const responseData = requestResponse.data;
        this.submitCurrentAudio(responseData.proctorDetailInstanceId);

        if (this.imageIsAllBlack(webcamImage) || this.imageIsAllBlack(screenshotImage)) {
            clearInterval(this.state.captureInterval);

            this.setState({
                ...this.state,
                state: 'PRIVILEGES',
                webcamPrivilege: !webcamDisabled,
                screenshotPrivilege: !screenCaptureDisabled,
            });
        }
    }

    async endTest() {
        await proctoringEndProctorSession({proctorSessionId: this.state.proctorSession._id});

        this.handleEndRecording();
    }

    renderTitle() {
        if (this.state.test && this.state.test.testName) {
            return <h1>{this.state.test.testName}</h1>
        }
        else {
            return <h1>Proctoring</h1>;
        }
    }

    render() {
        return (
            <div className="container prevent-text">
                <img src={editIcon} className="page-icon" alt="edit icon"/>
                <div className="spacer-vertical-s"></div>
                {this.renderTitle()}
                <div className="spacer-vertical-s"></div>
                <div className="spacer-vertical-s"></div>
                <ProctoringTerms
                    show={this.state.state === 'TERMS'}
                    handleConfirm={this.handleAgreeToTerms}
                />
                <GetPrivileges
                    show={this.state.state === 'PRIVILEGES'}
                    webcamPrivilege={this.state.webcamPrivilege}
                    screenshotPrivilege={this.state.screenshotPrivilege}
                    microphoneStream={this.state.microphoneStream}
                    webcamRef={this.webcamRef}
                    screenCaptureRef={this.screenCaptureRef}
                    proctorSession={this.state.proctorSession}
                    onScreenshotPrivilegeGranted={this.handleScreenCapturePrivilegeGranted}
                    onPermissionsGranted={this.handlePrivilegesGranted}
                    onMicrophoneStreamRequested={this.handleMicrophoneStreamGranted}
                />
                <TakeReferenceImage
                    show={this.state.state === 'REFERENCE'}
                    webcamRef={this.webcamRef}
                    proctorSession={this.state.proctorSession}
                    onReferenceImage={this.handleReferenceImageTaken}
                />
                <Recording
                    show={this.state.state === 'RECORDING'}
                    proctorSession={this.state.proctorSession}
                    test={this.state.test}
                    onEndRecording={this.handleEndRecording}
                />
                <EndOfTest
                    show={this.state.state === 'END'}
                    toStudentDashboard={this.goToStudentDashboard}
                    restart={this.restart}
                />
                <div className="container">
                    <div className={`shadow center${['REFERENCE', 'RECORDING'].includes(this.state.state) ? '' : ' display-none'}`}>
                        <Webcam 
                            ref={this.webcamRef}
                            onError={this.handleWebcamError}
                            onPermissionGranted={this.handleWebcamPrivilegeGranted}
                        />
                    </div>
                    <ScreenCapture
                        ref={this.screenCaptureRef}
                        onPermissionGranted={this.handleScreenCapturePrivilegeGranted}
                    />
                </div>
                {
                    this.state.state === 'RECORDING' &&
                    <button className='btn' onClick={this.endTest}>I'm Done!</button>
                }
            </div>
        )
    }
}

export default StudentProctoring;
