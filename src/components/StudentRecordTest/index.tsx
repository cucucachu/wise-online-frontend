import * as React from "react";
import Webcam from "react-webcam";
import { Link, RouteComponentProps } from "react-router-dom";

import { AuthContext, IAuthContext } from "../../contexts/AuthContext";
import { ProctorConfigContext, IProctorConfigContext } from "../../contexts/ProctorConfigContext";

import editIcon from "../../Assets/images/edit-icon.png";
import recordingIcon from "../../Assets/images/recording-icon.png";

import { i18n } from 'web-translate';

import { uploadReferenceImage, checkForStudent } from "../../store/faces";
import {
  submitTabs,
  submitScreenshot,
  submitProctoringError,
} from "../../store/axios";
import { useAuth } from "../../hooks";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

type StudentRecordTestProps = {
  authContext: IAuthContext;
  proctorContext: IProctorConfigContext;
} & RouteComponentProps;

class StudentRecordTest extends React.Component<StudentRecordTestProps, any> {
  chunks: any[];
  webcamRef: any;
  webCamInterval: any;
  screenshotInterval: any;
  monitorAudio: any;
  calibrateAudioBaseline: any;

  constructor(props: StudentRecordTestProps) {
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
    const minTime = this.props.proctorContext.screenshotInterval
      ? this.props.proctorContext.screenshotInterval * 1000
      : 10 * 1000;
    const offsetTime = 0;

    const webCamInterval = setInterval(this.capture, minTime + offsetTime);
    const screenshotInterval = setInterval(this.takeScreenshot, minTime + offsetTime);

    this.webCamInterval = webCamInterval;
    this.screenshotInterval = screenshotInterval;

    this.tabsHandler();
    this.startScreenVideo();
  }
  
  async startScreenVideo() {
    const screenVideo = document.getElementById("screen-video") as HTMLVideoElement;
    screenVideo.srcObject = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" } as any,
    });

    const displaySurface = (screenVideo.srcObject.getVideoTracks()[0].getSettings() as any)
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
    const screenVideo = document.getElementById("screen-video") as HTMLVideoElement;
    const screenStream: any = screenVideo.srcObject;
    if (!screenStream) return;
    const tracks = screenStream.getTracks();
    tracks.forEach((track: any) => track.stop());
  }

  componentWillUnmount() {
    clearInterval(this.webCamInterval);
    clearInterval(this.screenshotInterval);
    this.stopScreenVideo();
  }

  async takeScreenshot() {
    const screenVideo: any = document.getElementById("screen-video");
    const screenshotCanvas: any = document.getElementById("screenshot-canvas");

    screenshotCanvas.width = screenVideo.videoWidth;
    screenshotCanvas.height = screenVideo.videoHeight;
    screenshotCanvas
      .getContext("2d")
      .drawImage(screenVideo, 0, 0, screenVideo.videoWidth, screenVideo.videoHeight);
    const screenshot = screenshotCanvas.toDataURL("image/jpeg");
    await submitScreenshot(this.props.authContext.testAttendanceId, screenshot);
    if ((this as any).sendAudio) {
      (this as any).sendAudio();
    }
  }


  convertImage(image: any) {
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

          this.setState({
            referenceImage: faceId,
          });
        } else {
          await checkForStudent(
            this.props.authContext.testAttendanceId,
            this.state.referenceImage,
            image,
            imageSrc
          );
        }
      }
    } catch (error) {
      await submitProctoringError(this.props.authContext.testAttendanceId, (error as Error).message);
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
        submitTabs(this.props.authContext.testAttendanceId, event.data.tabs).catch(console.error);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <img src={editIcon} className="page-icon" alt="edit icon" />
          <div className="spacer-vertical" />
          <h1>{i18n("Now Proctoring")}</h1>
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
            {i18n("Recording in progress")}
          </p>
          <div className="spacer-vertical" />
          <Link to="/student/dashboard">
            <button className="btn">{i18n("End Recording")}</button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default (props: RouteComponentProps) => {
  const authContext = useAuth();
  const proctorConfigContext = React.useContext(ProctorConfigContext);

  return (
    <StudentRecordTest
      {...props}
      authContext={authContext}
      proctorContext={proctorConfigContext}
    />
  );
};
