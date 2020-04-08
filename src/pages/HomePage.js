import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
   } from "react-router-dom";

//components
import ProfessorLogin from '../components/professorLogin'
import ProfessorCourse from '../components/professorCourse'
import ProfessorAttendanace from '../components/professorAttendance'
import ProfessorClaim from '../components/professorClaim'
import ProfessorExam from '../components/professorExam';
import ProfessorClaimSuccess from '../components/professorClaimSuccess';

import StudentDashboard from '../components/studentDashboard'
import StudentClass from '../components/studentClass'
import StudentClassAtt from '../components/studentClassAtt'
import StudentLogin from '../components/studentLogin'
import StudentTest from '../components/studentTest'
import StudentAttSuccess from '../components/studentAttSuccess'
import StudentRecordTest from '../components/studentRecordTest'
import StudentTestId from '../components/studentTestId';
import StudentRecError from '../components/studentRecordingError';

import AdminLogin from '../components/adminLogin'
import SetUpSchoolPage from '../components/SetUpSchoolPage'
import AdminDownload from '../components/adminDownload'
import SchoolStep1 from '../components/createSchoolStep1'
import SchoolStep2 from '../components/createSchoolStep2'

import SelectRole from '../components/selectRole'


//contexts
import { AuthContext } from '../contexts/AuthContext'

import Header from '../components/header'

import PrivateRouteAdmin from '../components/PrivateRoute'
import PrivateRouteStudent from '../components/PrivateRouteStudent'
import PrivateRouteProfessor from '../components/PrivateRouteProfessor'
import StudentFeeWaive from '../components/studentFeeWaive'
import StudentFeeWaiveSelect from '../components/studentFeeWaiveSelect'
import StudentFeeWaiveForm from '../components/studentFeeWaiveForm'
import StudentFeeWaiveNote from '../components/studentFeeWaiveNote';
import StudentFeeWaiveConfirm from '../components/studentFeeWaiveConfirm';

class HomePage extends Component {
static contextType = AuthContext
  render(){
      return(
          <Router>
            <Header />
            <div className="wrap">
                <div className="page-header"></div>

                <Switch>
                       {/* admin */}
                        <PrivateRouteAdmin path="/set-up-school" component={SetUpSchoolPage} />
                        {/* <Route path="/set-up-school" component={SetUpSchoolPage} />  */}
                        <Route path="/create-school/step2" component={SchoolStep2} />
                        <Route path="/create-school" component={SchoolStep1} />
                        <PrivateRouteAdmin path="/admin/download" component={AdminDownload}/>
                        {/* <Route path="/admin/download" component={AdminDownload} /> */}
                        <Route path="/admin-login" component={AdminLogin} />

                        {/* professor */}
                        
                        <Route path="/professor-login" component={ProfessorLogin} />
                        <PrivateRouteProfessor path="/professor/course" component={ProfessorCourse} />
                        <Route path="/professor/claim-account" component={ProfessorClaim} />
                        {/* <PrivateRouteProfessor path="/professor/claim-account-success" component={ProfessorClaimSuccess} /> */}
                        <Route path="/professor/claim-account-success" component={ProfessorClaimSuccess} />
                        <PrivateRouteProfessor path="/professor/attendance" component={ProfessorAttendanace} />
                        <PrivateRouteProfessor path="/professor/exam" component={ProfessorExam} />

                        {/* student */}
                        <Route path="/student-login" component={StudentLogin} />
                        <PrivateRouteStudent path="/student/dashboard" component={StudentDashboard} />
                        <PrivateRouteStudent path="/student/classes" component={StudentClass} />
                        <PrivateRouteStudent path="/student/tests" component={StudentTest} />
                        <PrivateRouteStudent path="/student/class/attend" component={StudentClassAtt} />
                        <PrivateRouteStudent path="/student/class/attend-success" component={StudentAttSuccess} />
                        <PrivateRouteStudent path="/student/test/record" component={StudentRecordTest} />
                        {/* <Route path="/student/test/record" component={StudentRecordTest} /> */}
                        <PrivateRouteStudent path="/student/test-id" component={StudentTestId} />
                        <PrivateRouteStudent path="/student/test/recording-error" component={StudentRecError} />
                        <Route path="/student/fee-waiver" component={StudentFeeWaive} />
                        <Route path="/student/fee-waiver-select-school" component={StudentFeeWaiveSelect} />
                        <Route path="/student/fee-waiver-form" component={StudentFeeWaiveForm} />
                        <Route path="/student/fee-waiver-note" component={StudentFeeWaiveNote} />
                        <Route path="/student/fee-waiver-confirmation" component={StudentFeeWaiveConfirm} />
                        {/* landingpage */}
                        <Route exact path='/' component={SelectRole} />
                </Switch>   
            </div>
          </Router>
      )
  }
}

export default HomePage;