import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
   } from "react-router-dom";

//components
import ProfessorLogin from '../components/professorLogin'
import ProfessorCourse from '../components/professorCourse'
import ProfessorAttendanaceStart from '../components/professorAttendanceStart'
import ProfessorAttendanacesView from '../components/professorAttendancesView'
import AttendanaceView from '../components/AttendanceView'
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

// import Header from '../components/header'
import HeaderNew from '../components/headerNew'

import PrivateRouteAdmin from '../components/PrivateRouteAdmin'
import PrivateRouteStudent from '../components/PrivateRouteStudent'
import PrivateRouteProfessor from '../components/PrivateRouteProfessor'
import StudentFeeWaive from '../components/studentFeeWaive'
import StudentFeeWaiveSelect from '../components/studentFeeWaiveSelect'
import StudentFeeWaiveForm from '../components/studentFeeWaiveForm'
import StudentFeeWaiveNote from '../components/studentFeeWaiveNote';
import StudentFeeWaiveConfirm from '../components/studentFeeWaiveConfirm';

import headerBackground from '../Assets/images/header-img-mobile.png'
import ForgotPWAdmin from '../components/forgotPWAdmin';
import ForgotPWProfessor from '../components/forgotPWProfessor';
import ForgotPWSentProfessor from '../components/forgotPWSentProfessor';
import ForgotPWSentAdmin from '../components/forgotPWSentAdmin';
import AdminResetPW from '../components/adminResetPW';
import ProfessorResetPW from '../components/professorResetPW';
import AdminResetPWSuccess from '../components/adminResetPWSuccess';
import ProfessorResetPWSuccess from '../components/professorResetPWSuccess';
import SetupSchoolSuccess from '../components/setUpSchoolSuccess';
import ViewProctoring from '../components/professorViewProctoring';
import ViewTestResults from '../components/professorTestResults';
import ViewEachTestResult from '../components/professorViewTestData';
import StudentRecordAgreeToTerms from '../components/studentRecordAgreeToTerms';
import StudentInstallChromeExtension from '../components/studentInstallChromeExtension';
import AdminTerms from '../components/AdminTerms/AdminTermsPage';
// import AdminViewCourses from '../components/adminViewCourses';

class HomePage extends Component {
static contextType = AuthContext
  render(){
      return(
          <Router>
            <HeaderNew />
            <div className="wrap">
                <div className="page-header">
                  <img src={headerBackground} className="bg-img" alt="background"/>
                </div>

                <Switch>
                       {/* admin */}
                        <PrivateRouteAdmin path="/set-up-school" component={SetUpSchoolPage} />
                        {/* <Route path="/set-up-school" component={SetUpSchoolPage} />  */}
                        <Route path="/create-school/step2" component={SchoolStep2} />
                        <Route path="/create-school" component={SchoolStep1} />
                        <PrivateRouteAdmin path="/admin/download" component={AdminDownload}/>
                        {/* <Route path="/admin/download" component={AdminDownload} /> */}
                        <Route path="/admin/reset-password" component={AdminResetPW} />
                        <Route path="/admin/reset-success" component={AdminResetPWSuccess} />
                        <PrivateRouteAdmin path="/admin/set-up-success" component={SetupSchoolSuccess} />
                        <PrivateRouteAdmin path="/admin/terms" component={AdminTerms} />
                        {/* <PrivateRouteAdmin path="/admin/view-courses" component={AdminViewCourses} /> */}
                        <Route path="/admin-login" component={AdminLogin} />

                        {/* professor */}
                        
                        <Route path="/professor-login" component={ProfessorLogin} />
                        <Route path="/professor/reset-password" component={ProfessorResetPW} />
                        <Route path="/professor/reset-success" component={ProfessorResetPWSuccess} />
                        <PrivateRouteProfessor path="/professor/course" component={ProfessorCourse} />
                        <Route path="/professor/claim-account" component={ProfessorClaim} />
                        {/* <PrivateRouteProfessor path="/professor/claim-account-success" component={ProfessorClaimSuccess} /> */}
                        <Route path="/professor/claim-account-success" component={ProfessorClaimSuccess} />
                        <PrivateRouteProfessor path="/professor/attendancesView" component={ProfessorAttendanacesView} />
                        <PrivateRouteProfessor path="/professor/attendanceView" component={AttendanaceView} />
                        <PrivateRouteProfessor path="/professor/attendance/start" component={ProfessorAttendanaceStart} />
                        <PrivateRouteProfessor path="/professor/exam" component={ProfessorExam} />
                        <PrivateRouteProfessor path="/professor/proctoring/:courseId" component={ViewProctoring} />
                        <PrivateRouteProfessor path="/professor/view-report/:testId" component={ViewTestResults} />
                        <PrivateRouteProfessor path="/professor/view-detail" component={ViewEachTestResult} />
                        {/* <PrivateRouteProfessor 
                        path="/professor/proctoring/:courseId" 
                        render={(props) => <ViewProctoring {...props} />} /> */}

                        {/* student */}
                        <Route path="/student-login" component={StudentLogin} />
                        <PrivateRouteStudent path="/student/dashboard" component={StudentDashboard} />
                        <PrivateRouteStudent path="/student/classes" component={StudentClass} />
                        <PrivateRouteStudent path="/student/tests" component={StudentTest} />
                        <PrivateRouteStudent path="/student/class/attend" component={StudentClassAtt} />
     
                        <PrivateRouteStudent path="/student/class/attend-success" component={StudentAttSuccess} />
                        <Route path="/test-route/student-success" component={StudentAttSuccess} />
                        <PrivateRouteStudent path="/student/test/record" component={StudentRecordTest} />
                        {/* <Route path="/student/test/record" component={StudentRecordTest} /> */}
                        <PrivateRouteStudent path="/student/test-id" component={StudentTestId} />
                        <PrivateRouteStudent path="/student/record-agree-to-terms" component={StudentRecordAgreeToTerms} />
                        
                        <PrivateRouteStudent path="/student/chrome-extension" component={StudentInstallChromeExtension} />
                        <PrivateRouteStudent path="/student/test/recording-error" component={StudentRecError} />
                        <Route path="/student/fee-waiver" component={StudentFeeWaive} />
                        <Route path="/student/fee-waiver-select-school" component={StudentFeeWaiveSelect} />
                        <Route path="/student/fee-waiver-form" component={StudentFeeWaiveForm} />
                        <Route path="/student/fee-waiver-note" component={StudentFeeWaiveNote} />
                        <Route path="/student/fee-waiver-confirmation" component={StudentFeeWaiveConfirm} />

                        <Route path="/admin/forgot-pw" component={ForgotPWAdmin} />
                        <Route path="/professor/forgot-pw" component={ForgotPWProfessor} />
                        <Route path="/admin/reset-pw-sent" component={ForgotPWSentAdmin} />
                        <Route path="/professor/reset-pw-sent" component={ForgotPWSentProfessor} />

                        {/* <Route path="/test" component={StudentRecordTest} />
                        <Route path="/test-error" component={StudentRecError} /> */}

                        {/* landingpage */}

                        <Route exact path='/' component={SelectRole} />
                </Switch>   
            </div>
          </Router>
      )
  }
}

export default HomePage;