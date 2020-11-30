import React, { Component } from 'react';

import ViewTable from '../Resusable/ViewTable';

import { proctoringGetTestDetails } from '../../store/axios';

import editIcon from '../../Assets/images/edit-icon.png'

class ProfessorTestView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...this.props.location.state,
        }

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
        }
        

        this.setState({
            ...this.state,
            test: response.data.test,
        });
    }

    handleClickStudentTest(index) {
        this.props.history.push('/proctor/result', {
            ...this.state,
            studentTest: this.state.test.studentTests[index],
        });
    }

    render() {
        return (
            <div className="container">
                <img src={editIcon} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical"></div>

                <h1>Tests for {this.state.course.name}</h1>
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
                            label: 'Issues',
                            propertyName: 'issues',
                        },
                    ]}
                    rows={this.state.test.studentTests}
                />
            </div>
        )
    }
}

export default ProfessorTestView;