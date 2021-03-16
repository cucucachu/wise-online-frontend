import React, { Component } from 'react';

import DataPane from '../Resusable/DataPane';
import ProctorDetailView from './ProctorDetailView';

import { proctoringGetStudentTestDetails, proctoringGetStudentTestDetailsAndImages } from '../../store/axios';

import editIcon from '../../Assets/images/edit-icon.png'

class ProfessorViewStudentTest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            frame: 0,
            ...this.props.location.state,
            proctorDetails: [],
            issueFrames: [],
            playInterval: null,
        };

        this.nextFrame = this.nextFrame.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.handleChangeSlider = this.handleChangeSlider.bind(this);
        this.handleClickNextIssue = this.handleClickNextIssue.bind(this);
    }

    async componentDidMount() {
        const response = await proctoringGetStudentTestDetails(this.state.studentTest._id);

        const studentTest = response.data.studentTest;

        studentTest.name = `${studentTest.studentFirstName} ${studentTest.studentLastName}`;

        studentTest.start = studentTest.startTime ? new Date(studentTest.startTime).toLocaleString() : '';
        if (studentTest.endTime) {
            studentTest.end = new Date(studentTest.endTime).toLocaleString();
        }
        else {
            studentTest.end = studentTest.latestSubmissionTime ? new Date(studentTest.latestSubmissionTime).toLocaleString() : '';
        }

        studentTest.suspiciousActivity = studentTest.multiplePeopleFound 
        || studentTest.lowConfidenceScore || studentTest.studentAwayFromCamera
        || studentTest.forbiddenWebsitesFound || studentTest.unknownWebsitesFound
        || studentTest.missingWebcamImages || studentTest.missingScreenshots;

        studentTest.issues = [];
        if (studentTest.suspiciousActivity) {
            if (studentTest.multiplePeopleFound) studentTest.issues.push('Multiple People in Webcam');
            if (studentTest.lowConfidenceScore) studentTest.issues.push('Low Facial Recognition Score');
            if (studentTest.studentAwayFromCamera) studentTest.issues.push('Student Away From Camera');
            if (studentTest.forbiddenWebsitesFound) studentTest.issues.push('Foorbidden Websites Visited');
            if (studentTest.unknownWebsitesFound) studentTest.issues.push('Unknown Websites Visited');
            if (studentTest.missingWebcamImages) studentTest.issues.push('Webcam Disabled During Test');
            if (studentTest.missingScreenshots) studentTest.issues.push('Screen Capture Disabled During Test');
        }

        let proctorDetails = [];
        let issueFrames = [];

        for (const proctorSession of studentTest.proctorSessions) {
           proctorDetails = [...proctorDetails, ...proctorSession.proctorDetails];
           proctorSession.proctorDetails = undefined; 
        }

        for (const detailIndex in proctorDetails) {
            const proctorDetail = proctorDetails[detailIndex];

            if (!proctorDetail.hasScreenshot || !proctorDetail.hasWebcamImage) {
                issueFrames.push(Number(detailIndex));
            }
            else if (!proctorDetail.confidenceScore || proctorDetail.confidenceScore < this.state.test.proctorConfiguration.facialRecognitionThreshold) {
                issueFrames.push(Number(detailIndex));
            }
            else if (proctorDetail.numberOfPeople !== 1) {
                issueFrames.push(Number(detailIndex));
            }
            else if (proctorDetail.forbiddenURLs || proctorDetail.unknownURLs) {
                issueFrames.push(Number(detailIndex));
            }
        }

        this.setState({
            ...this.state,
            studentTest: response.data.studentTest,
            proctorDetails,
            issueFrames,
        });

        this.getStudentTestDetails(proctorDetails.length);
    }

    async getStudentTestDetails(numberOfProctorDetails) {
        const pageSize = 2;

        for (let index = 0; index < numberOfProctorDetails; index += pageSize) {
            
            const response = await proctoringGetStudentTestDetailsAndImages({
                studentTestId: this.state.studentTest._id,
                start: index,
                pageSize,
            });

            const proctorDetails = [...this.state.proctorDetails];
            if (response && response.data && response.data.proctorDetails)
                proctorDetails.splice(index, response.data.proctorDetails.length, ...response.data.proctorDetails);

            this.setState({
                ...this.state,
                proctorDetails,
            });
        }
    }

    play() {
        if (this.state.playInterval === null) {
            this.nextFrame();
            const playInterval = setInterval(this.nextFrame, 500);
            this.setState({
                ...this.state,
                playInterval,
            });
        }
    }

    pause() {
        if (this.state.playInterval !== null) {
            clearInterval(this.state.playInterval);
            this.setState({
                ...this.state,
                playInterval: null,
            });
        }
    }

    nextFrame() {
        if (this.state.frame >= this.state.proctorDetails.length - 1) {
            this.pause();
        }
        else {
            this.setState({
                ...this.state,
                frame: this.state.frame + 1,
            });
        }
    }

    handleChangeSlider(e) {
        this.setState({
            ...this.state,
            frame: Number(e.target.value),
        });
    }

    handleClickNextIssue() {
        if (!this.state.issueFrames) {
            return;
        }

        const frame = this.state.frame;

        let nextIssueFrame = this.state.issueFrames[0];

        for (const issueFrame of this.state.issueFrames) {
            if (frame < issueFrame) {
                nextIssueFrame = issueFrame;
                break;
            }
        }

        this.setState({
            ...this.state,
            frame: nextIssueFrame,
        });
    }

    render() {
        return (
            <div className="container">
                <img src={editIcon} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical"></div>

                <h1>Proctoring Results for {this.state.studentTest.name}</h1>
                <div className="spacer-vertical"></div>
                <DataPane 
                    title="Summary"
                    data={{
                        'Student': this.state.studentTest.name,
                        'Start Time': this.state.studentTest.start,
                        'End Time': this.state.studentTest.end,
                        'Proctor Session': 
                            this.state.studentTest.proctorSessions.map(session => {
                                const start = new Date(session.startTime).toLocaleString();
                                let end = '?';
                                if (session.endTime) {
                                    end = new Date(session.endTime).toLocaleString();
                                }
                                else if (session.proctorDetails && session.proctorDetails.length) {
                                    end = new Date(session.proctorDetails[session.proctorDetails.length - 1].timestamp).toLocaleString();
                                }
                                else {
                                    end = start;
                                }
                                return `${start} - ${end}`
                            }),
                    }}
                />
                {(() => {
                    if (this.state.studentTest.issues.length) {
                        return (          
                            <DataPane
                                title="Suspicious Activity"
                                data={{
                                    'Issue': this.state.studentTest.issues,
                                }}
                            />
                        )
                    } else return (
                        <div className="shadow">
                            <h2>No Suspicious Activity Found</h2>
                        </div>
                    );
                })()}
                <div className="spacer-vertical"></div>
                <div className="shadow">
                    <ProctorDetailView
                        proctorDetail={this.state.proctorDetails[this.state.frame]}
                        proctorConfiguration={this.state.test.proctorConfiguration}
                        frame={this.state.frame}
                        max={this.state.proctorDetails.length}
                        hasIssues={this.state.issueFrames.length !== 0}
                        onChangeSlider={this.handleChangeSlider}
                        onClickPlay={this.play}
                        onClickPause={this.pause}
                        onClickNextIssue={this.handleClickNextIssue}
                    />
                </div>
            </div>
        )
    }
}

export default ProfessorViewStudentTest;