import React, { Component }　from 'react';
import { Link } from 'react-router-dom'

import { adminGetSchoolDetails, adminGetSchoolTests } from '../store/axios';

import attendanceIcon from '../Assets/images/attendance-icon.png';
import DataPane from './Resusable/DataPane';
import { i18n } from 'web-translate';

type AdminHomePageProps = {};
type AdminHomePageState = {
    schoolData: {
        'Name'?: string;
        'Current Term'?: string;
        'Professors'?: string;
        'Students'?: string;
        'Total Tests Taken'?: any;
    }  
};

class AdminHomePage extends Component<AdminHomePageProps, AdminHomePageState> {

    constructor(props: AdminHomePageProps) {
        super(props);

        this.state = {
            schoolData: {}
        }
    }

    async componentDidMount() {
        const response = await adminGetSchoolDetails();
        const response2 = await adminGetSchoolTests();
        const schoolData = response.data.school;
        const totalTests = response2.data.tests.testsData;

        this.setState({
            ...this.state,
            schoolData: {
                'Name': schoolData.name,
                'Current Term': schoolData.currentTerm.name,
                'Professors': schoolData.professors,
                'Students': schoolData.students,
                'Total Tests Taken': totalTests,
                // 'Tests Taken This Term': schoolData.currentTermTests,
            }
        })
    }

    render() {
        return ( 
            <div className="container">
                    <img src={ attendanceIcon } className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical-s"></div>
                    <h1>{this.state.schoolData?.Name ?? 'Loadng...'}</h1>
                    <div className="spacer-vertical" />
                    <DataPane 
                        title="School Details"
                        data={this.state.schoolData}
                    />
    
                    <div className="spacer-vertical-s"></div>
    
                    <div className="shadow">
                        <h2>{i18n("Actions")}</h2>
                        <hr></hr>
                        <div className="center">
                        <Link to="/admin-terms">
                            
                            <button className="btn-l">
                            {i18n("Academic Terms")}
                            </button>
                        </Link>
                        
                        <div className="spacer-vertical-s"></div>
                        <Link to="/admin/addUsers">
                            <button className="btn-l">{i18n("Add Students and Professors")}</button>
                        </Link>
                        
                        <div className="spacer-vertical-s"></div>
                        <Link to="/set-up-school">
                            <button className="btn-l">{i18n("Bulk Upload")}</button>
                        </Link>
                        
                        <div className="spacer-vertical-s"></div>
                        <Link to="/admin/professors">
                            <button className="btn-l">{i18n("View Professors")}</button>
                        </Link>
                        
                        <div className="spacer-vertical-s"></div>
                        <Link to="/admin/students">
                            <button className="btn-l">{i18n("View Students")}</button>
                        </Link>
                        </div>
                    </div>

            </div>
        );
    }
}
   
  export default AdminHomePage;
