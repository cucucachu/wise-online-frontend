import React, { Component } from 'react'
import Webcam from "react-webcam";
import { Link } from "react-router-dom";

import { AuthContext } from '../contexts/AuthContext'
import editIcon from '../Assets/images/edit-icon.png'
import recordingIcon from '../Assets/images/recording-icon.png'

import { uploadReferenceImage, checkForStudent } from '../store/faces';
import { submitTabs, submitScreenshot, submitProctoringError } from '../store/axios';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

class StudentRecordTest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			referenceImage: null,
			webCamInterval: null,
			screenshotInterval: null,
		}

		this.webcamRef = React.createRef();

		this.capture = this.capture.bind(this);

		this.takeScreenshot = this.takeScreenshot.bind(this);
	}

	static contextType = AuthContext;


	componentDidMount() {
		const minTime = 10 * 1000;
		const offsetTime = Math.floor(Math.random() * 2) * 1000;

		const webCamInterval = setInterval(this.capture, minTime + offsetTime);
		const screenshotInterval = setInterval(this.takeScreenshot, minTime + offsetTime);

		const state = Object.assign({}, this.state);
		state.webCamInterval = webCamInterval;
		state.screenshotInterval = screenshotInterval;
		this.setState(state);

		this.tabsHandler();
		this.startScreenVideo();
	}

	async startScreenVideo() {
		const screenVideo = document.getElementById('screen-video');
		screenVideo.srcObject = await navigator.mediaDevices.getDisplayMedia({
			video: { mediaSource: 'screen' },
		});

		const displaySurface = screenVideo.srcObject.getVideoTracks()[0].getSettings().displaySurface;
		screenVideo.play();

		if (displaySurface !== 'monitor') {
			this.stopScreenVideo();
			await this.startScreenVideo();
		}
	}

	stopScreenVideo() {
		const screenVideo = document.getElementById('screen-video');
		const screenStream = screenVideo.srcObject;
		const tracks = screenStream.getTracks();

		tracks.forEach(track => track.stop());
	}

	componentWillUnmount() {
		clearInterval(this.state.webCamInterval);
		clearInterval(this.state.screenshotInterval);
		this.stopScreenVideo();
	}

	async takeScreenshot() {
		const screenVideo = document.getElementById('screen-video');
		const screenshotCanvas = document.getElementById('screenshot-canvas');

		screenshotCanvas.width = screenVideo.videoWidth;
		screenshotCanvas.height = screenVideo.videoHeight;
		screenshotCanvas.getContext('2d').drawImage(screenVideo, 0, 0, screenVideo.videoWidth, screenVideo.videoHeight);
		const screenshot = screenshotCanvas.toDataURL('image/jpeg');

		await submitScreenshot(this.context.testAttendanceId, screenshot);
	}

	convertImage(image) {
		var data = image.split(',')[1];
		
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
	
			if(imageSrc == null){
				this.props.history.push("recording-error");
			}
			else {
				const image = this.convertImage(imageSrc);
	
				if (!this.state.referenceImage) {
					const faceId = await uploadReferenceImage(image);
		
					const state = Object.assign({}, this.state);
					state.referenceImage = faceId;
					this.setState(state);
				}
				else {
					await checkForStudent(this.context.testAttendanceId, this.state.referenceImage, image, imageSrc);
				}
			}
		}
		catch (error) {
			await submitProctoringError(this.context.testAttendanceId, error.message);
		}
	}

	getTabs() {
		window.postMessage({ type: 'REQUEST_TABS' }, '*');
	}

	tabsHandler() {
		window.addEventListener('message', event => {
			if (!event.data || !event.data.type || event.data.type !== 'TABS_RESPONSE') {
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
					<img src={editIcon} className="page-icon" alt="edit icon"/>
					<div className="spacer-vertical"></div>
					<h1>Now Proctoring</h1>
					<div className="spacer-vertical"></div>
					<Webcam
						audio={false}
						height={315}
						ref={this.webcamRef}
						screenshotFormat="image/jpeg"
						width={600}
						videoConstraints={videoConstraints}
					/><br/>
					<canvas id="screenshot-canvas" style={{display: 'none'}}></canvas>
					<video id='screen-video' style={{display: 'none'}}></video>
					<p className="text-plain"><img className="icon-xs" src={recordingIcon} alt="recording icon"></img>Recording in progress</p>
					<div className="spacer-vertical"></div>
					<Link to="/student/dashboard">
					<button className="btn">End recording</button>
					</Link>
				</div>
			</React.Fragment>
		)
	}

}

export default StudentRecordTest