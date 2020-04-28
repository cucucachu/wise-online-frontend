import React, { Component } from 'react'
import Webcam from "react-webcam";
import { Link } from "react-router-dom";

import { AuthContext } from '../contexts/AuthContext'
import editIcon from '../Assets/images/edit-icon.png'
import recordingIcon from '../Assets/images/recording-icon.png'

import { uploadReferenceImage, checkForStudent } from '../store/faces';

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
			interval: null,
		}

		this.webcamRef = React.createRef();

		this.capture = this.capture.bind(this);
	}

	static contextType = AuthContext;


	componentDidMount() {
		const interval = setInterval(this.capture, 5000);
		const state = Object.assign({}, this.state);
		state.interval = interval;
		this.setState(state);
	}

	componentWillUnmount() {
		clearInterval(this.state.interval);
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