import React, { Component } from 'react';
import attendanceIcon from '../../Assets/images/attendance-icon.png';

import { superGetSchoolDetails, superLoginAsAdmin, superCreateSchool } from '../../store/axios';
import ViewTable from '../Resusable/ViewTable';

class SuperDashboard extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            newSchool: null,
            schools: [],
        }

        this.handleClickSchool = this.handleClickSchool.bind(this);
        this.handleClickCreateSchool = this.handleClickCreateSchool.bind(this);
        this.handleChangeSetupKey = this.handleChangeSetupKey.bind(this);
        this.handleClickCloseNewSchool = this.handleClickCloseNewSchool.bind(this);
        this.handleClickSubmitNewSchool = this.handleClickSubmitNewSchool.bind(this);
    }

    async componentDidMount() {
        await this.loadSchools();
    }

    async loadSchools() {
        const response = await superGetSchoolDetails();

        if (response.status === 401) {
            await this.props.logout();
            this.props.history.push('/');
            return;
        }

        for (const school of response.data.schools) {
            school.adminEmail = school.admin ? school.admin.email : '';
            school.currentTermName = school.currentTerm ? school.currentTerm.name : '';
            school.numberOfTerms = school.terms ? school.terms.length : 0;
        }

        this.setState({
            ...this.state,
            schools: response.data.schools,
            newSchool: null,
        });
    }

    async handleClickSchool(schoolIndex) {
        console.log(`Clicked ${this.state.schools[schoolIndex].name}`);
        const school = this.state.schools[schoolIndex];
            
        const response = await superLoginAsAdmin(school._id);
        
        if (response.status === 200) {
            this.props.onSuccessfulLogin(response.data);
            this.props.history.push('/admin');
        }
    }

    handleClickCreateSchool() {
        this.setState({
            ...this.state,
            newSchool: {
                setupKey: '',
            }
        });
    }

    handleChangeSetupKey(e) {
        this.setState({
            ...this.state,
            newSchool: {
                ...this.state.newSchool,
                setupKey: e.target.value,
            }
        });
    }

    handleClickCloseNewSchool() {
        this.setState({
            ...this.state,
            newSchool: null,
        });
    }

    async handleClickSubmitNewSchool() {
        if (!this.state.newSchool || !this.state.newSchool.setupKey) {
            return;
        }

        const response = await superCreateSchool(this.state.newSchool.setupKey);

        if (response.status === 204) {
            await this.loadSchools();
        }
        else {
            this.setState({
                ...this.state,
                error: 'Please choose a different setup key.',
            });
        }
    }

    renderNewSchoolPopup() {
        if (this.state.newSchool) {
            return (
                <div className="popup">
                    <div>
                        <button onClick={() => this.handleClickCloseNewSchool()}>&#128473;</button>
                        <h2>New School</h2>
                        <hr></hr>
                        {(() => {
                            if (this.state.error) {
                                return <p className="red">{this.state.error}</p>
                            }
                            else return '';
                        })()}
                        <label>Setup Key</label>
                        <input type="text" onChange={this.handleChangeSetupKey} value={this.state.newSchool.setupKey}/>
                        <button className="btn-submit" onClick={this.handleClickSubmitNewSchool}>Submit</button>
                    </div>
                </div>
            )
        }
        else return '';
    }

    render() {
        return (
            <div className="container">
                <img src={ attendanceIcon } className="page-icon" alt="login icon"/>
                <div className="spacer-vertical-s"></div>
                <h1>Super Dashboard</h1>
                <div className="spacer-vertical"></div>
                {this.renderNewSchoolPopup()}
                <ViewTable
                    title="Schools"
                    columns={[
                        {
                            label: 'Name',
                            propertyName: 'name',
                            onClick: this.handleClickSchool,
                        },
                        {
                            label: 'Setup Key',
                            propertyName: 'setupKey',
                        },
                        {
                            label: 'Admin',
                            propertyName: 'adminEmail',
                        },
                        {
                            label: 'Current Term',
                            propertyName: 'currentTermName',
                        },
                        {
                            label: 'Terms',
                            propertyName: 'numberOfTerms',
                        },
                        {
                            label: 'Professors',
                            propertyName: 'professors',
                        },
                        {
                            label: 'Students',
                            propertyName: 'students',
                        },
                    ]}
                    rows={this.state.schools}
                    createButton={{
                        text: 'Create',
                        onClick: this.handleClickCreateSchool,
                    }}
                />
            </div>
        )
    }
}

export default SuperDashboard;