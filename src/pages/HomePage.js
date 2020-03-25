import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
   } from "react-router-dom";

//components
import ProfessorLogin from '../components/professorLogin'
// import SchoolLogin from '../components/schoolLogin'
import ProfessorCourse from '../components/professorCourse'
import ProfessorClaimAccount from '../components/professorClaim'
import ProfessorAttendanace from '../components/professorAttendance'

import StudentDashboard from '../components/studentDashboard'
import StudentClass from '../components/studentClass'
import StudentClassAtt from '../components/studentClassAtt'
import StudentLogin from '../components/studentLogin'
import StudentTest from '../components/studentTest'
import StudentAttSuccess from '../components/studentAttSuccess'
import StudentRecordTest from '../components/studentRecordTest'

import AdminLogin from '../components/adminLogin'
import SetUpSchoolPage from '../components/SetUpSchoolPage'
import AdminDownload from '../components/adminDownload'
import SchoolStep1 from '../components/createSchoolStep1'
import SchoolStep2 from '../components/createSchoolStep2'

import SelectRole from '../components/selectRole'

//pages
import ProfessorClaim from '../components/professorClaim'

//contexts
import { AuthContext } from '../contexts/AuthContext'
import { adminLogin } from '../store/axios';

import Header from '../components/header'
import ProfessorExam from '../components/professorExam';
import ProfessorClaimSuccess from '../components/professorClaimSuccess';
import StudentTestId from '../components/studentTestId';
import StudentRecError from '../components/studentRecordingError';



class HomePage extends Component {
static contextType = AuthContext
  render(){
      const { isAuthenticated } = this.context
      return(
          <Router>
            <Header />
            <div className="wrap">
                <div className="page-header"></div>

                <Switch>
                       {/* admin */}
                        <Route path="/set-up-school" component={SetUpSchoolPage} />
                        <Route path="/create-school/step2" component={SchoolStep2} />
                        <Route path="/create-school" component={SchoolStep1} />
                        <Route path="/admin/download" component={AdminDownload} />
                        <Route path="/admin-login" component={AdminLogin} />

                        {/* professor */}
                        <Route path="/professor-login" component={ProfessorLogin} />
                        <Route path="/professor/course" component={ProfessorCourse} />
                        <Route path="/professor/claim-account" component={ProfessorClaim} />
                        <Route path="/professor/claim-account-success" component={ProfessorClaimSuccess} />
                        <Route path="/professor/attendance" component={ProfessorAttendanace} />
                        <Route path="/professor/exam" component={ProfessorExam} />

                        {/* student */}
                        <Route path="/student-login" component={StudentLogin} />
                        <Route path="/student/dashboard" component={StudentDashboard} />
                        <Route path="/student/classes" component={StudentClass} />
                        <Route path="/student/tests" component={StudentTest} />
                        <Route path="/student/class/attend" component={StudentClassAtt} />
                        <Route path="/student/class/attend-success" component={StudentAttSuccess} />
                        <Route path="/student/test/record" component={StudentRecordTest} />
                        <Route path="/student/test-id" component={StudentTestId} />
                        <Route path="/student/test/recording-error" component={StudentRecError} />
                        

                        {/* landingpage */}
                        <Route exact path='/' component={SelectRole} />
                </Switch>   
            </div>
          </Router>
      )
  }
}

export default HomePage;