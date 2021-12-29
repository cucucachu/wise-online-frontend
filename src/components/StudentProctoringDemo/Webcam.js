import React, { Component } from 'react'
import ReactWebcam from "react-webcam";


class Webcam extends Component {
    constructor(props) {
        super(props);

        this.webcamRef = React.createRef();
        this.state = {}
    }

    requestPermission() {
        return this.webcamRef.current.requestUserMedia();
    }

    permissionGranted() {
        return this.getImage() ? true : false;
    }

    getImage() {
        return this.webcamRef.current.getScreenshot();
    }

    render() {
        return (
            <ReactWebcam
                className={this.props.hidden ? 'display-none' : ''}
                audio={this.props.audio ? this.props.audio : false}
                height={this.props.height ? this.props.height : 315}
                ref={this.webcamRef}
                onUserMedia={this.props.onPermissionGranted}
                onUserMediaError={this.props.onError}
                screenshotFormat={this.props.screenshotFormat ? this.props.screenshotFormat : 'image/jpeg'}
                width={this.props.width ? this.props.width : 600}
                videoConstraints={this.props.videoConstraints ? this.props.videoConstraints : {
                    width: 1280,
                    height: 720,
                    facingMode: "user"
                }}
            />
        )
    }
}

export default Webcam;