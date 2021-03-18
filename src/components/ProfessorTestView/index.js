import React, { Component } from 'react';
import moment from 'moment';

import ViewTable from '../Resusable/ViewTable';
import DataPane from '../Resusable/DataPane';

import { proctoringGetTestDetails } from '../../store/axios';

import editIcon from '../../Assets/images/edit-icon.png'

class ProfessorTestView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...this.props.location.state,
            title: 'Loading...',
        };

        this.handleClickStudentTest = this.handleClickStudentTest.bind(this);
    }

    async componentDidMount() {
        const response = await proctoringGetTestDetails(this.state.test._id);

        for (const studentTest of response.data.test.studentTests) {
            studentTest.name = `${studentTest.studentFirstName} ${studentTest.studentLastName}`;
            studentTest.suspiciousActivity = studentTest.multiplePeopleFound 
            || studentTest.lowConfidenceScore || studentTest.studentAwayFromCamera
            || studentTest.forbiddenWebsitesFound || studentTest.unknownWebsitesFound
            || studentTest.missingWebcamImages || studentTest.missingScreenshots;

            if (studentTest.suspiciousActivity) {
                studentTest.issues = [];
                if (studentTest.multiplePeopleFound) studentTest.issues.push('Multiple People in Webcam');
                if (studentTest.lowConfidenceScore) studentTest.issues.push('Low Facial Recognition Score');
                if (studentTest.studentAwayFromCamera) studentTest.issues.push('Student Away From Camera');
                if (studentTest.forbiddenWebsitesFound) studentTest.issues.push('Forbidden Websites Visited');
                if (studentTest.unknownWebsitesFound) studentTest.issues.push('Unknown Websites Visited');
                if (studentTest.missingWebcamImages) studentTest.issues.push('Webcam Disabled During Test');
                if (studentTest.missingScreenshots) studentTest.issues.push('Screen Capture Disabled During Test');
            }
            else {
                studentTest.issues = 'None';
            }

            studentTest.start = studentTest.startTime ? new Date(studentTest.startTime).toLocaleString() : '';
            if (studentTest.endTime) {
                studentTest.end = new Date(studentTest.endTime).toLocaleString();
            }
            else {
                studentTest.end = studentTest.latestSubmissionTime ? new Date(studentTest.latestSubmissionTime).toLocaleString() : '';
            }

            studentTest.sessionCount = studentTest.proctorSessions.length;
            studentTest.duration = (moment.duration(moment(studentTest.endTime).diff(moment(studentTest.startTime)))).asSeconds() + " seconds";
        }
        

        this.setState({
            ...this.state,
            test: response.data.test,
            title: response.data.test.testName ? response.data.test.testName : `Test on ${new Date(response.data.test.startTime).toLocaleString()}`,
        });
    }

    handleClickStudentTest(index) {
        this.props.history.push('/proctor/result', {
            ...this.state,
            studentTest: this.state.test.studentTests[index],
        });
    }

    urlForTest(test) {
        let link;

        if (!test || !test.course.classId || !test.keyCode) {
            return "";
        }

        const classId = test.course.classId;
        const keyCode = test.keyCode;

        if (window.location.hostname === 'localhost') {
            link = `http://localhost:3000/student/testLink?c=${classId.replaceAll(/ /g, '%20')}&k=${keyCode}`;
        }
        else {
            link = `https://${window.location.hostname}/student/testLink?c=${classId.replaceAll(/ /g, '%20')}&k=${keyCode}`;
        }

        return link;
    }

    render() {
        return (
            <div className="container">
                <img src={editIcon} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical" />

                <h1>{this.state.title}</h1>
                <DataPane
                    title="Test Info"
                    data={{
                        "Course": this.state.test.course.name,
                        "Test Name": this.state.test.testName,
                        "Start Time": new Date(this.state.test.startTime).toLocaleString(),
                        "URL for Students": this.urlForTest(this.state.test),
                        "Number of Results": this.state.test.studentTests.length,
                    }}
                />
                <ViewTable
                    title="Test Results"
                    columns={[
                        {
                            label: 'Student Name',
                            propertyName: 'name',
                            onClick: this.handleClickStudentTest,
                        },
                        {
                            label: 'Start',
                            propertyName: 'start',
                        },
                        {
                            label: 'End',
                            propertyName: 'end',
                        },
                        {
                            label: 'Duration',
                            propertyName: 'duration',
                        },
                        {
                            label: 'Issues',
                            propertyName: 'issues',
                        },
                        {
                            label: 'Sessions',
                            propertyName: 'sessionCount',
                        },
                    ]}
                    rows={this.state.test.studentTests}
                />
            </div>
        )
    }
}

export default ProfessorTestView;