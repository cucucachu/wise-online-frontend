import React, { Component } from 'react';

class ScreenCapture extends Component {

    constructor(props) {
        super(props);

        this.state = {
            permissionGranted: false,
        };


    }

    componentDidMount() {
        this.startScreenVideo();
    }

	componentWillUnmount() {
		this.stopScreenVideo();
    }
    
    async requestPermission() {
        return this.startScreenVideo();
    }

    permissionGranted() {
        return this.state.permissionGranted;
    }

	async startScreenVideo() {
		const screenVideo = document.getElementById('screen-capture-video');
		screenVideo.srcObject = await navigator.mediaDevices.getDisplayMedia({
			video: { mediaSource: 'screen' },
		});

		const displaySurface = screenVideo.srcObject.getVideoTracks()[0].getSettings().displaySurface;
		screenVideo.play();

		if (displaySurface !== 'monitor') {
			this.stopScreenVideo();
        }
        else {
            this.setState({
                ...this.state,
                permissionGranted: true,
            });

            if (this.props.onPermissionGranted) {
                this.props.onPermissionGranted();
            }
        }
	}

	stopScreenVideo() {
		const screenVideo = document.getElementById('screen-capture-video');
        const screenStream = screenVideo.srcObject;
        
        if (!screenStream) 
            return;

		const tracks = screenStream.getTracks();
		tracks.forEach(track => track.stop());
	}

	async takeScreenshot() {
		const screenVideo = document.getElementById('screen-capture-video');
		const screenshotCanvas = document.getElementById('screen-capture-canvas');

		screenshotCanvas.width = screenVideo.videoWidth;
		screenshotCanvas.height = screenVideo.videoHeight;
		screenshotCanvas.getContext('2d').drawImage(screenVideo, 0, 0, screenVideo.videoWidth, screenVideo.videoHeight);
		const screenshot = screenshotCanvas.toDataURL('image/jpeg');

        return screenshot;
	}

    render() {
        return (
            <div id="screen-capture">
                <canvas id="screen-capture-canvas" style={{display: 'none'}}></canvas>
                <video id='screen-capture-video' style={{display: 'none'}}></video>
            </div>
        );
    }
}

export default ScreenCapture;