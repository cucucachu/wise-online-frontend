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
            audioBlobArray: [],
            captureInterval: null,
            calibratedDBThreshold: -50, // this is in dBFS (not the conventional dBSPL), thus the negative number
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
        this.handleClickEnableMicrophone = this.handleClickEnableMicrophone.bind(this);
        this.handleAvailableData = this.handleAvailableData.bind(this);
        this.restart = this.restart.bind(this);

        this.startRecording = this.startRecording.bind(this);
        this.capture = this.capture.bind(this);
        this.endTest = this.endTest.bind(this);
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
            // TODO - navigator.mediaDevices polyfill https://github.com/mozdevs/mediaDevices-getUserMedia-polyfill/blob/master/README.md
            const stream = await navigator.mediaDevices.getUserMedia({ audio: { noiseSuppression: true, echoCancellation: true }});
            
            this.setState({ microphoneStream: stream });
        }
        catch (error) {
            console.error(error);
        }
    }

    handleWebcamError(error) {
        console.log(error);
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

        this.calibrateAudioBaseline().then(( averageDB ) => {
            this.setState({ calibratedDBThreshold: averageDB })
        });
    }

    handleAvailableData(e) {
        if (e.data.size > 0) {
            const newAudioBlobArray = [...this.state.audioBlobArray];
            newAudioBlobArray.push(e.data);
            this.setState({ audioBlobArray: newAudioBlobArray })
        }

        // const newChunks = [...this.state.audioChunks, e.data];
        // this.setState({ audioChunks: newChunks });
        // this.setState({ audioBlob: e.data });
    }

    handleReferenceImageTaken() {
        // this.setState({
        //     ...this.state,
        //     state: 'RECORDING',
        // });
        this.startRecording();
        this.monitorAudio(this.state.calibratedDBThreshold);
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
        let interval = 5 * 1000;

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
        return getAudioThumbprint(this.state.microphoneStream).then((averageDB) => {
            console.log("CALIBRATION READING TAKEN", `${ averageDB } dBFS`)
            this.setState({ calibratedDBThreshold: averageDB });
            return averageDB;
        });
    };


  async submitCurrentAudio(proctorDetailsId) {
    // if (!this.state.audioRecorder) return;
        if (!this.state.audioBlobArray.length) return;
        const audioBlob = new Blob(this.state.audioBlobArray, { type: 'audio/webm' });
    // this.state.audioRecorder.requestData();

      const fd = new FormData();
      console.log("Finished audio blob", audioBlob)
    fd.append("audio", audioBlob);

    const voiceDetected = this.state.voiceDetected;
this.setState({ audioBlobArray: [] });

    // console.log(this.state.audioBlob);
  // if ( this.state.audioBlob ) {
  //     const blob = new Blob([ this.state.audioBlob ], { type: 'audio/webm' });
  //     console.log(blob);
  //     let url = URL.createObjectURL(blob);
  //     let a = document.createElement("a");
  //     document.body.appendChild(a);
  //     a.style = "display: none";
  //     a.href = url;
  //     a.download = `${+new Date()}-test`;
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  // }

    if (voiceDetected) {
        this.setState({ voiceDetected: false });
        return submitAudio(fd, proctorDetailsId, voiceDetected);
    }
  }

  monitorAudio(dBThreshold) {
    // determines what permissions the user has

    const voiceEvents = thresholdVoice(this.state.microphoneStream ,
        { threshold: dBThreshold || -50, }
    );
    const recorder = new MediaRecorder(this.state.microphoneStream);

    recorder.onstop = function (e) {
        console.log("done recording");
    };

    recorder.ondataavailable = this.handleAvailableData

    recorder.start(100);

    this.setState({ audioRecorder: recorder });

    voiceEvents.on("speaking", () => {
        this.setState({ voiceDetected: true })
        console.log("VOICE DETECTION: SPEAKING");
    });

    voiceEvents.on("stopped_speaking", () => {
        console.log("VOICE DETECTION: STOPPED SPEAKING");
    });
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
            voiceDetected: this.state.voiceDetected,
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
                    onMicrophoneStreamRequested={this.handleClickEnableMicrophone}
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
