import React, { Component } from 'react';

import TextWithCheckbox from '../Resusable/TextWithCheckbox';

import { proctoringVerifyPrivileges } from '../../store/axios';

class GetPrivileges extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            webcamMessage: '',
            screenCaptureMessage: '',
            microphoneMessage: '',
        }

        this.handleClickEnableWebcam = this.handleClickEnableWebcam.bind(this);

        this.handleClickEnableScreenCapture = this.handleClickEnableScreenCapture.bind(this);

        this.handleContinue = this.handleContinue.bind(this);
    }

    handleClickEnableWebcam() {
        if (this.state.webcamPrivilege === false) {
            this.props.webcamRef.current.requestPermission();
        }
    }

    async handleClickEnableScreenCapture() {
        if (this.props.screenshotPrivilege === false) {
            try {
                await this.props.screenCaptureRef.current.requestPermission();

                if (this.props.screenCaptureRef.current.permissionGranted()) {
                    this.props.onScreenshotPrivilegeGranted();
                }
                else {
                    this.setState({
                        ...this.state,
                        screenCaptureMessage: 'You must share your entire screen.',
                    });
                }
            }
            catch (error) {
                this.setState({
                    ...this.state,
                });
            }
        }
    }

    async handleContinue() {
        if (this.props.webcamPrivilege && this.props.screenshotPrivilege && this.props.microphoneStream) {
            await proctoringVerifyPrivileges({
                proctorSessionId: this.props.proctorSession._id,
                webcamPrivilege: true,
                screenshotPrivilege: true,
                microphonePrivilege: true,
            });

            this.props.onPermissionsGranted();
        }
        else {

            this.setState({
                ...this.state,
                message: 'You cannot continue until all privileges have been granted.',
            })
        }
    }

    render() {
        return (
            <div className={`shadow center${this.props.show ? '' : ' display-none'}`}>
                <div className="spacer-vertical-s"></div>
                <div className="width-80 center">
                    <h2>Instructions</h2>
                <hr/>
                    <div className="spacer-vertical-s"></div>
                    <div className="black width-60 text-align-left">
                        <ul>
                            <li>Your browser will request these permissions.</li>
                            <li>If this doesn't happen automatically, click the checkboxes below to request the permissions.</li>
                            <li>For screen share, you must select 'Your Entire Screen'.</li>
                            <li>If you're having trouble, here are some helpful links.</li>
                            <ul>
                                <li>
                                    <a 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://support.google.com/chrome/answer/2693767?co=GENIE.Platform%3DDesktop&hl=en"
                                    >How to Enable Your Webcam</a>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="width-80 center">
                    <h2>Permissions</h2>
                    <hr/>
                    {(() => { if (this.state.message) return <p className="red">{this.state.message}</p>; else return ''; })()}
                    <TextWithCheckbox 
                        text="Webcam Permission"
                        checked={this.props.webcamPrivilege}
                        onClick={this.handleClickEnableWebcam}
                        
                    />
                    {(() => { if (this.state.webcamMessage) return <p className="red">{this.state.webcamMessage}</p>; else return ''; })()}
                    <TextWithCheckbox 
                        text="Screen Capture Permission"
                        checked={this.props.screenshotPrivilege}
                        onClick={this.handleClickEnableScreenCapture}
                    />
                    {(() => { if (this.state.screenCaptureMessage) return <p className="red">{this.state.screenCaptureMessage}</p>; else return ''; })()}
                    <TextWithCheckbox 
                        text="Microphone Permission"
                        checked={this.state.microphoneStream}
                        onClick={this.props.onMicrophoneStreamRequested}
                    />
                    {(() => { if (this.state.microphoneMessage) return <p className="red">{this.state.microphoneMessage}</p>; else return ''; })()}
                </div>
                <div className="spacer-vertical-s"></div>
                <button onClick={this.handleContinue} className="btn">Continue</button>
            </div>
        )
    }
}

export default GetPrivileges;
