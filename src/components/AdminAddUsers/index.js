import React, {Component} from 'react';
import setUpIcon from '../../Assets/images/setting-icon.png';
import { adminAddStudents, adminAddProfessors } from '../../store/axios';

import EditTable from '../Resusable/EditTable';

class AdminAddUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [
                {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    email: '',
                    studentId: '',
                    errors: {},
                },
            ],
            professors: [
                {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    email: '',
                    errors: {},
                },
            ],
            studentsSubmitted: false,
            professorsSubmitted: false,
            studentSuccessMessage: null,
            studentError: null,
            professorError: null,
            professorSuccessMessage: null,
        };

        this.handleChangeProfessor = this.handleChangeProfessor.bind(this);
        this.handleClickRemoveProfessorRow = this.handleClickRemoveProfessorRow.bind(this);
        this.handleClickAddProfessorRow = this.handleClickAddProfessorRow.bind(this);
        this.handleClickSubmitProfessors = this.handleClickSubmitProfessors.bind(this);
        this.handleChangeStudent = this.handleChangeStudent.bind(this);
        this.handleClickRemoveStudentsRow = this.handleClickRemoveStudentsRow.bind(this);
        this.handleClickAddStudentRow = this.handleClickAddStudentRow.bind(this);
        this.handleClickSubmitStudents = this.handleClickSubmitStudents.bind(this);
    }

    handleChangeProfessor(e, index, propertyName) {
        const state = Object.assign({}, this.state);
    
        const professor = state.professors[index];
    
        professor[propertyName] = e.target.value;
    
        this.setState(state);
    }

    handleClickRemoveProfessorRow(index) {
        const state = Object.assign({}, this.state);
        state.professors.splice(index, 1);

        this.setState(state);
    }

    handleClickAddProfessorRow() {
        const state = Object.assign({}, this.state);
        state.professors.push({
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
        });

        this.setState(state);
    }

    handleChangeStudent(e, index, propertyName) {
        const state = Object.assign({}, this.state);
    
        const student = state.students[index];
    
        student[propertyName] = e.target.value;
    
        this.setState(state);
    }

    handleClickRemoveStudentsRow(index) {
        const state = Object.assign({}, this.state);
        state.students.splice(index, 1);

        this.setState(state);
    }

    handleClickAddStudentRow() {
        const state = Object.assign({}, this.state);
        state.students.push({
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            studentId: '',
            errors: {},
        });

        this.setState(state);
    }

    async handleClickSubmitStudents() {
        const students = [];
        let valid = true;

        if (!this.state.students) {
            return;
        }

        for (const originalStudent of this.state.students) {
            const student = {
                ...originalStudent,
                errors: {},
            }

            if (student.email.includes('@') === false || student.email.includes('.') === false || student.email.includes(' ') === true) {
                student.errors.email = 'Invalid email.'
                valid = false;
            }

            if (student.firstName === '') {
                student.errors.firstName = 'First name is required.';
                valid = false;
            }

            if (student.lastName === '') {
                student.errors.lastName = 'Last name is required.';
                valid = false;
            }

            if (student.email === '') {
                student.errors.email = 'Email is required.';
                valid = false;
            }

            if (student.studentId === '') {
                student.errors.studentId = 'Student id is required.'
                valid = false;
            }

            students.push(student);
        }

        if (valid) {
            const response = await adminAddStudents(students);

            if (response.status === 200) {
                this.setState({
                    ...this.state,
                    students: [
                        {
                            firstName: '',
                            middleName: '',
                            lastName: '',
                            email: '',
                            studentId: '',
                            errors: {},
                        },
                    ],
                    studentError: null,
                    studentsSubmitted: true,
                    studentSuccessMessage: `Successfully added ${response.data.students.length} students.`,
                });
            }
            else {
                this.setState({
                    ...this.state,
                    students,
                    studentError: response.data.error,
                    studentSuccessMessage: null,
                });
            }
        }
        else {
            this.setState({
                ...this.state,
                students,
                studentSuccessMessage: null,
            });
        }
    }

    async handleClickSubmitProfessors() {
        const professors = [];
        let valid = true;

        if (!this.state.professors) {
            return;
        }

        for (const originalProfessor of this.state.professors) {
            const professor = {
                ...originalProfessor,
                errors: {},
            }

            if (professor.email.includes('@') === false || professor.email.includes('.') === false || professor.email.includes(' ') === true) {
                professor.errors.email = 'Invalid email.'
                valid = false;
            }

            if (professor.firstName === '') {
                professor.errors.firstName = 'First name is required.';
                valid = false;
            }

            if (professor.lastName === '') {
                professor.errors.lastName = 'Last name is required.';
                valid = false;
            }

            if (professor.email === '') {
                professor.errors.email = 'Email is required.';
                valid = false;
            }

            professors.push(professor);
        }

        if (valid) {
            const response = await adminAddProfessors(professors);
            if (response.status === 200) {
                this.setState({
                    ...this.state,
                    professors: [
                        {
                            firstName: '',
                            middleName: '',
                            lastName: '',
                            email: '',
                            errors: {},
                        },
                    ],
                    professorError: null,
                    professorsSubmitted: true,
                    professorSuccessMessage: `Successfully added ${response.data.professors.length} professors.`,
                });
            }
            else {
                this.setState({
                    ...this.state,
                    professors,
                    professorError: response.data.error,
                    professorSuccessMessage: null,
                });
            }
        }
        else {
            this.setState({
                ...this.state,
                professors,
                professorSuccessMessage: null,
            });
        }
    }

    render() {
        return (
            <div className="wrap">
                <div className="page-header"></div>
                <div className="container">
                    <img src={setUpIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>Add Students and Professors</h1>
                    <div className="spacer-vertical"></div>
                    <EditTable 
                        title="Professors"
                        columns={[
                            {
                                label: 'First Name',
                                propertyName: 'firstName',
                            },
                            {
                                label: 'Middle Name',
                                propertyName: 'middleName',
                            },
                            {
                                label: 'Last Name',
                                propertyName: 'lastName',
                            },
                            {
                                label: 'Email',
                                propertyName: 'email',
                            },
                        ]}
                        rows={this.state.professors}
                        error={this.state.professorError}
                        success={this.state.professorSuccessMessage}
                        onChangeCell={this.handleChangeProfessor}
                        onClickRemoveRow={this.handleClickRemoveProfessorRow}
                        onClickAddRow={this.handleClickAddProfessorRow}
                        onClickSubmit={this.handleClickSubmitProfessors}
                    />
                    <EditTable 
                        title="Students"
                        columns={[
                            {
                                label: 'First Name',
                                propertyName: 'firstName',
                            },
                            {
                                label: 'Middle Name',
                                propertyName: 'middleName',
                            },
                            {
                                label: 'Last Name',
                                propertyName: 'lastName',
                            },
                            {
                                label: 'Email',
                                propertyName: 'email',
                            },
                            {
                                label: 'Student Id',
                                propertyName: 'studentId',
                            },
                        ]}
                        rows={this.state.students}
                        error={this.state.studentError}
                        success={this.state.studentSuccessMessage}
                        onChangeCell={this.handleChangeStudent}
                        onClickRemoveRow={this.handleClickRemoveStudentsRow}
                        onClickAddRow={this.handleClickAddStudentRow}
                        onClickSubmit={this.handleClickSubmitStudents}
                    />
                </div>
            </div>
        )
    }
}

export default AdminAddUsers;
