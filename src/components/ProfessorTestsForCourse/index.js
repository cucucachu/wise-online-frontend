import React, { Component } from 'react';

import ViewTable from '../Resusable/ViewTable';

import { proctoringGetTestsForCourse, getTestResults } from '../../store/axios';

import editIcon from '../../Assets/images/edit-icon.png'

class ProfessorTestsForCourse extends Component {

    constructor(props) {
        super(props);

        this.state = {
            course: this.props.location.state.course,
            tests: [],
        }

        this.onClickTest = this.onClickTest.bind(this);
    }

    async componentDidMount() {
        const response = await proctoringGetTestsForCourse(this.state.course._id);

        for (const test of response.data.tests) {
            test.numberOfProctoringResults = test.studentTests.length + test.testAttendances.length;
            test.date = new Date(test.startTime).toLocaleString();

            if (test.proctorSystemVersion !== 2) {
                const response2 = await getTestResults(undefined, test._id);
                test.results = response2.data.proctoringResults;
                test.proctorConfiguration = response2.data.proctorConfiguration;
            }
        }

        this.setState({
            ...this.state,
            tests: response.data.tests,
        });
    }

    onClickTest(index) {
        const test = this.state.tests[index];

        if (test.proctorSystemVersion === 2) {
            this.props.history.push('/proctor/test/', {
                course: this.state.course,
                test,
            });
        }
        else {
            this.props.history.push(`/professor/view-report/${test._id}`, {
                examDate: test.date,
                exam: test,
            });
        }
    }

    render() {
        return (
            <div className="container">
                <img src={editIcon} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical" />
                <h1>Tests for {this.state.course.name}</h1>
                <ViewTable
                    title="Tests"
                    columns={[
                        {
                            label: 'Date',
                            propertyName: 'date',
                            onClick: this.onClickTest,
                        },
                        {
                            label: 'Name',
                            propertyName: 'testName',
                            onClick: this.onClickTest,
                        },
                        {
                            label: 'Code',
                            propertyName: 'keyCode',
                        },
                        {
                            label: 'Proctoring Results',
                            propertyName: 'numberOfProctoringResults',
                            onClick: this.onClickTest,
                        },
                    ]}
                    rows={this.state.tests}
                />
            </div>
        )
    }
}

export default ProfessorTestsForCourse;