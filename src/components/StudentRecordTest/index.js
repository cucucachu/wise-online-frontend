import React, { Component } from "react";
import Webcam from "react-webcam";
import { thresholdVoice, getAudioThumbprint } from "./audio";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import editIcon from "../../Assets/images/edit-icon.png";
import recordingIcon from "../../Assets/images/recording-icon.png";

import { uploadReferenceImage, checkForStudent } from "../../store/faces";
import {
  submitTabs,
  submitScreenshot,
  submitAudio,
  submitProctoringError,
} from "../../store/axios";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

// It relies on audio being divided into 'chunks' depending on the number of images taken.
// 1. All audio will be recorded only in the vocal band 500hz to 4000hz
// 2. We'll take an audio thumbprint of '5' seconds when the student clicks to take their ID verification image. The average DB on this thumbprint will set the noise-threshold, above which all audio will be flagged
// 3. Any audio that is above the noise threshold, will cause the entire audio 'chunk' to be flagged.
class StudentRecordTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      referenceImage: null,
      webCamInterval: null,
      screenshotInterval: null,
      audioRecorder: null,
      audioBlob: null,
      calibratedDBThreshold: null,
    };

    this.chunks = [];
    this.webcamRef = React.createRef();

    this.capture = this.capture.bind(this);
    this.monitorAudio = this.monitorAudio.bind(this);
    this.calibrateAudioBaseline = this.calibrateAudioBaseline.bind(this);

    this.takeScreenshot = this.takeScreenshot.bind(this);
  }

  static contextType = AuthContext;

  componentDidMount() {
    const minTime = this.context.screenshotInterval
      ? this.context.screenshotInterval * 1000
      : 10 * 1000;
    const offsetTime = 0;

    const webCamInterval = setInterval(this.capture, minTime + offsetTime);
    const screenshotInterval = setInterval(this.takeScreenshot, minTime + offsetTime);

    const state = Object.assign({}, this.state);
    state.webCamInterval = webCamInterval;
    state.screenshotInterval = screenshotInterval;
    this.setState(state);
    
    this.calibrateAudioBaseline().then(( averageDB ) => {
       this.monitorAudio(averageDB);
    });

    this.tabsHandler();
    this.startScreenVideo();
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

  monitorAudio(dBThreshold) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

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

  async startScreenVideo() {
    const screenVideo = document.getElementById("screen-video");
    screenVideo.srcObject = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
    });

    const displaySurface = screenVideo.srcObject.getVideoTracks()[0].getSettings()
      .displaySurface;
    screenVideo.play();

    if (displaySurface !== "monitor") {
      this.stopScreenVideo();
      await this.startScreenVideo();
    }
  }

  // stopScreenVideo() {
  // 	const screenVideo = document.getElementById('screen-video');
  // 	const screenStream = screenVideo.srcObject;
  // 	const tracks = screenStream.getTracks();

  // 	tracks.forEach(track => track.stop());
  // }
  stopScreenVideo() {
    const screenVideo = document.getElementById("screen-video");
    const screenStream = screenVideo.srcObject;
    if (!screenStream) return;
    const tracks = screenStream.getTracks();
    tracks.forEach((track) => track.stop());
  }

  componentWillUnmount() {
    clearInterval(this.state.webCamInterval);
    clearInterval(this.state.screenshotInterval);
    this.stopScreenVideo();
  }

  async takeScreenshot() {
    const screenVideo = document.getElementById("screen-video");
    const screenshotCanvas = document.getElementById("screenshot-canvas");

    screenshotCanvas.width = screenVideo.videoWidth;
    screenshotCanvas.height = screenVideo.videoHeight;
    screenshotCanvas
      .getContext("2d")
      .drawImage(screenVideo, 0, 0, screenVideo.videoWidth, screenVideo.videoHeight);
    const screenshot = screenshotCanvas.toDataURL("image/jpeg");
    this.sendAudio();
    await submitScreenshot(this.context.testAttendanceId, screenshot);
  }

  async sendAudio() {
    if (!this.state.audioRecorder) return;
    
    this.state.audioRecorder.requestData();

    const fd = new FormData();
    fd.append("audio", this.state.audioBlob);

    submitAudio(fd);
  }

  convertImage(image) {
    var data = image.split(",")[1];

    var bytes = window.atob(data);
    var buf = new ArrayBuffer(bytes.length);
    var byteArr = new Uint8Array(buf);

    for (var i = 0; i < bytes.length; i++) {
      byteArr[i] = bytes.charCodeAt(i);
    }

    return byteArr;
  }

  async capture() {
    this.getTabs();

    try {
      const imageSrc = this.webcamRef.current.getScreenshot();

      if (imageSrc == null) {
        this.props.history.push("recording-error");
      } else {
        const image = this.convertImage(imageSrc);

        if (!this.state.referenceImage) {
          const { faceId } = await uploadReferenceImage(image);

          const state = Object.assign({}, this.state);
          state.referenceImage = faceId;
          this.setState(state);
        } else {
          await checkForStudent(
            this.context.testAttendanceId,
            this.state.referenceImage,
            image,
            imageSrc
          );
        }
      }
    } catch (error) {
      await submitProctoringError(this.context.testAttendanceId, error.message);
    }
  }

  getTabs() {
    window.postMessage({ type: "REQUEST_TABS" }, "*");
  }

  tabsHandler() {
    window.addEventListener("message", (event) => {
      if (!event.data || !event.data.type || event.data.type !== "TABS_RESPONSE") {
        return;
      }

      if (event.data.tabs && event.data.tabs.length) {
        submitTabs(this.context.testAttendanceId, event.data.tabs).catch(console.error);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <img src={editIcon} className="page-icon" alt="edit icon" />
          <div className="spacer-vertical" />
          <h1>Now Proctoring</h1>
          <div className="spacer-vertical" />
          <Webcam
            audio={false}
            height={315}
            ref={this.webcamRef}
            screenshotFormat="image/jpeg"
            width={600}
            videoConstraints={videoConstraints}
          />
          <br />
          <canvas id="screenshot-canvas" style={{ display: "none" }} />
          <video id="screen-video" style={{ display: "none" }} />
          <p className="text-plain">
            <img className="icon-xs" src={recordingIcon} alt="recording icon" />
            Recording in progress
          </p>
          <div className="spacer-vertical" />
          <Link to="/student/dashboard">
            <button className="btn">End recording</button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default StudentRecordTest;
