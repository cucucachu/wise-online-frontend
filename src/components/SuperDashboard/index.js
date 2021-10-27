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
        this.handleChangeSetupKey = this.handleChangeSetupKey.bind(this);
        this.handleClickCloseNewSchool = this.handleClickCloseNewSchool.bind(this);
        this.handleClickSubmitNewSchool = this.handleClickSubmitNewSchool.bind(this);
        this.handleClickSchoolSettings = this.handleClickSchoolSettings.bind(this);
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

    handleChangeNewSchoolName(e) {
        this.setState({
            ...this.state,
            newSchool: {
                ...this.state.newSchool,
                name: e.target.value,
            }
        });
    }

    handleChangeNewSchoolEmail(e) {
        this.setState({
            ...this.state,
            newSchool: {
                ...this.state.newSchool,
                email: e.target.value,
            }
        });
    }

    handleChangeBillingType(e) {
        this.setState({
            ...this.state,
            newSchool: {
                ...this.state.newSchool,
                billingType: e.target.value,
            }
        });
    }
    
    handleChangeBillingType(e) {
        this.setState({
            ...this.state,
            newSchool: {
                ...this.state.newSchool,
                billingType: e.target.value,
            }
        });
    }

    handleChangeUnitPrice(e) {
        this.setState({
            ...this.state,
            newSchool: {
                ...this.state.newSchool,
                unitPrice: e.target.value,
            }
        });
    }

    handleChangeBillingFrequency(e) {
        this.setState({
            ...this.state,
            newSchool: {
                ...this.state.newSchool,
                billingFrequency: e.target.value,
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

        const response = await superCreateSchool(
            this.state.newSchool.setupKey, 
            this.state.newSchool.adminEmail,
            this.state.newSchool.billingType,
            Number(this.state.newSchool.unitPrice),
            Number(this.state.newSchool.billingFrequency));

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
                                    type="text"
                                    placeholder={i18n("Setup Key")}
                                    className=""
                                    name="setupKey"
                                    value={this.state.newSchool.setupKey}
                                    onChange={this.handleChangeSetupKey.bind(this)}
                                    required
                                />
                                <br />
                                <span className="input-label">{i18n("School Name")} </span>
                                <input
                                    type="text"
                                    placeholder={i18n("School Name")}
                                    className=""
                                    name="name"
                                    value={this.state.newSchool.name}
                                    onChange={this.handleChangeNewSchoolName.bind(this)}
                                    required
                                />
                                <br />
                                <span className="input-label">{i18n("School Contact")} </span>
                                <input
                                    type="email"
                                    placeholder={i18n("Email")}
                                    className=""
                                    name="adminEmail"
                                    value={this.state.newSchool.adminEmail}
                                    onChange={this.handleChangeNewSchoolEmail.bind(this)}
                                    required
                                />
                                <br />
                                <span className="input-label">{i18n("Billing Type")} </span>
                                <select onChange={this.handleChangeBillingType.bind(this)} value={this.state.newSchool.billingType} className="">
                                    <option disabled selected value> -- select an option -- </option>
                                    <option key="Per Student" value="student"> Per Student </option>
                                    <option key="Per Test" value="test"> Per Test </option>
                                </select>
                                <br />
                                <span className="input-label">{i18n("Unit Price")} </span>
                                <input
                                    type="number"
                                    placeholder={i18n("$")}
                                    className=""
                                    name="unitPrice"
                                    value={this.state.newSchool.unitPrice}
                                    onChange={this.handleChangeUnitPrice.bind(this)}
                                    required
                                />
                                <br />
                                <span className="input-label">{i18n("Billing Frequency")} </span>
                                <select onChange={this.handleChangeBillingFrequency.bind(this)} value={this.state.newSchool.billingFrequency} className="">
                                    <option disabled selected value> -- select an option -- </option>
                                    <option key="Per Quarter" value="10"> Per Quarter </option>
                                    <option key="Per Semester" value="15"> Per Semester </option>
                                    <option key="Per Year" value="52"> Per Year </option>
                                </select>
                                
                                
                            </div>
                           

                        </form>


                        <button className="btn-submit" onClick={this.handleClickSubmitNewSchool}>{i18n("Submit")}</button>








                        {/* OLD 
                        <label>{i18n("Setup Key")}</label>
                        <input type="text" onChange={this.handleChangeSetupKey} value={this.state.newSchool.setupKey}/>
                        <br></br>
                        <label>{i18n("Name     ")}</label>
                        <input type="text" onChange={this.handleChangeSetupKey} value={this.state.newSchool.setupKey}/>
                         */}



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