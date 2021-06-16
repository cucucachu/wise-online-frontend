import React, { Component }　from 'react';
import { Link } from 'react-router-dom'

import { adminGetSchoolDetails } from '../store/axios';

import attendanceIcon from '../Assets/images/attendance-icon.png';
import DataPane from './Resusable/DataPane';
import { i18n } from 'web-translate';

class AdminHomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            schoolData: {}
        }
    }

    async componentDidMount() {
        const response = await adminGetSchoolDetails();
        const schoolData = response.data.school;

        this.setState({
            ...this.state,
            schoolData: {
                'Name': schoolData.name,
                'Current Term': schoolData.currentTerm.name,
                'Professors': schoolData.professors,
                'Students': schoolData.students,
            }
        })
    }

    render() {
        return ( 
            <div className="container">
                    <img src={ attendanceIcon } className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical-s"></div>
                    <h1>{sessionStorage.getItem('schoolName')}</h1>
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
