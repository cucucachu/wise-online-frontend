import React, { Component } from 'react';
import attendanceIcon from '../../Assets/images/attendance-icon.png';

import { superGetSchoolDetails, superLoginAsAdmin, superCreateSchool } from '../../store/axios';
import ViewTable from '../Resusable/ViewTable';

import { i18n } from 'web-translate';

class SuperDashboard extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            newSchool: null,
            schools: [],
        }

        this.handleClickSchool = this.handleClickSchool.bind(this);
        this.handleClickCreateSchool = this.handleClickCreateSchool.bind(this);
        this.handleClickCloseNewSchool = this.handleClickCloseNewSchool.bind(this);
        this.handleClickSubmitNewSchool = this.handleClickSubmitNewSchool.bind(this);
        this.handleClickSchoolSettings = this.handleClickSchoolSettings.bind(this);
        this.handleChangeNewSchool = this.handleChangeNewSchool.bind(this);
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
            school.settings = 'Settings';
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

    handleClickSchoolSettings(schoolIndex) {
        this.props.history.push('/super/school/settings', {school: this.state.schools[schoolIndex]});
    }

    handleClickCreateSchool() {
        this.setState({
            ...this.state,
            newSchool: {
                setupKey: '',
                name: '',
                adminEmail: '',
                billingType: '',
                billingFrequency: '',
                unitPrice: '',
            }
        });
    }

    handleChangeNewSchool(e) {
        this.setState({
            ...this.state,
            newSchool: {
                ...this.state.newSchool,
                [e.target.id]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
            }
        })
    }

    handleClickCloseNewSchool() {
        this.setState({
            ...this.state,
            newSchool: null,
        });
    }

    async handleClickSubmitNewSchool(e) {
        e.preventDefault();
        if (!this.state.newSchool || !this.state.newSchool.setupKey) {
            return;
        }

        let { setupKey, adminEmail, billingType, unitPrice, billingFrequency } = this.state.newSchool;
        billingFrequency = parseInt(billingFrequency);

        const request = {
            setupKey,
            adminEmail,
            billingType,
            unitPrice,
            billingFrequency,
        };

        const response = await superCreateSchool(request);

        if (response.status === 204) {
            await this.loadSchools();
        }
        else {
            this.setState({
                ...this.state,
                error: `Please fix the following field: ${response.data.properties[0]}`,
            });
        }
    }

    renderNewSchoolPopup() {
        if (this.state.newSchool) {
            return (
                <div className="popup">
                    <div>
                        <button onClick={() => this.handleClickCloseNewSchool()}>&#128473;</button>
                        <h2>{i18n("New School")}</h2>
                        <hr></hr>
                        {(() => {
                            if (this.state.error) {
                                return <p className="red">{this.state.error}</p>
                            }
                            else return '';
                        })()}

                        <form onSubmit={this.handleClickSubmitNewSchool.bind(this)}>
                            <div className="input-wrapper">
                                <span className="input-label">{i18n("Setup Key")} </span>
                                <input
                                    id="setupKey"
                                    type="text"
                                    placeholder={i18n("Setup Key")}
                                    className=""
                                    name="setupKey"
                                    value={this.state.newSchool.setupKey}
                                    onChange={this.handleChangeNewSchool}
                                    required
                                />
                                <br />
                                <span className="input-label">{i18n("School Name")} </span>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder={i18n("School Name")}
                                    className=""
                                    name="name"
                                    value={this.state.newSchool.name}
                                    onChange={this.handleChangeNewSchool}
                                    required
                                />
                                <br />
                                <span className="input-label">{i18n("School Contact")} </span>
                                <input
                                    id="adminEmail"
                                    type="email"
                                    placeholder={i18n("Email")}
                                    className=""
                                    name="adminEmail"
                                    value={this.state.newSchool.adminEmail}
                                    onChange={this.handleChangeNewSchool}
                                    required
                                />
                                <br />
                                <span className="input-label">{i18n("Billing Type")} </span>
                                <select id="billingType" onChange={this.handleChangeNewSchool}  className="">
                                    <option disabled selected value> -- select an option -- </option>
                                    <option key="Per Student" value="student"> Per Student </option>
                                    <option key="Per Test" value="test"> Per Test </option>
                                </select>
                                <br />
                                <span className="input-label">{i18n("Unit Price")} </span>
                                <input
                                    id="unitPrice"
                                    type="number"
                                    placeholder={i18n("$")}
                                    className=""
                                    name="unitPrice"
                                    value={this.state.newSchool.unitPrice}
                                    onChange={this.handleChangeNewSchool}
                                    required
                                />
                                <br />
                                <span className="input-label">{i18n("Billing Frequency")} </span>
                                <select id="billingFrequency" type="number" onChange={this.handleChangeNewSchool}  className="">
                                    <option disabled selected value> -- select an option -- </option>
                                    <option key="Per Quarter" value="10"> Per Quarter </option>
                                    <option key="Per Semester" value="15"> Per Semester </option>
                                    <option key="Per Year" value="52"> Per Year </option>
                                </select>
                                
                                
                                
                            </div>
                           
                            <input type="submit" className="btn-submit" value="Create School" />

                        </form>


                        {/* <button className="btn-submit" onClick={this.handleClickSubmitNewSchool}>{i18n("Create School")}</button> */}

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
                <h1>{i18n("Super Dashboard")}</h1>
                <div className="spacer-vertical" />
                {this.renderNewSchoolPopup()}
                <ViewTable
                    title={i18n("Schools")}
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
                        {
                            label: 'Settings',
                            propertyName: 'settings',
                            onClick: this.handleClickSchoolSettings,
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