import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
   } from "react-router-dom";

import { logout, checkLogin } from '../store/axios';

//components
import ProfessorLogin from '../components/professorLogin'
import ProfessorCourse from '../components/professorCourse'
import ProfessorAttendanaceStart from '../components/professorAttendanceStart'
import ProfessorAttendanacesView from '../components/professorAttendancesView'
import AttendanaceView from '../components/AttendanceView'
import ProfessorClaim from '../components/professorClaim'
import ProfessorExam from '../components/professorExam';
import ProfessorClaimSuccess from '../components/professorClaimSuccess';
import ProctorSettings from '../components/ProctorSettings';

import StudentDashboard from '../components/studentDashboard'
import StudentClass from '../components/studentClass'
import StudentClassAtt from '../components/studentClassAtt'
import StudentLogin from '../components/studentLogin'
import StudentTest from '../components/studentTest'
import StudentAttSuccess from '../components/studentAttSuccess'
import StudentRecordTest from '../components/studentRecordTest'
import StudentTestId from '../components/studentTestId';
import StudentRecError from '../components/studentRecordingError';
import StudentAttendanceFromLink from '../components/StudentAttendanceFromLink';
import StudentTestFromLink from '../components/StudentTestFromLink';

import AdminLogin from '../components/adminLogin'
import SetUpSchoolPage from '../components/SetUpSchoolPage'
import AdminHomePage from '../components/AdminHomePage'
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
import ViewEachTestResult from '../components/ProfessorViewTestData';
import StudentRecordAgreeToTerms from '../components/studentRecordAgreeToTerms';
import StudentInstallChromeExtension from '../components/studentInstallChromeExtension';
import AdminTermsPage from '../components/AdminTerms/AdminTermsPage';
// import AdminViewCourses from '../components/adminViewCourses';

class HomePage extends Component {
    
    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            username: sessionStorage.getItem('username') === 'undefined' ? undefined : sessionStorage.getItem('username'),
            schoolName: sessionStorage.getItem('schoolName') === 'undefined' ? undefined : sessionStorage.getItem('schoolName'),
            isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true' ? true : false,
            role: sessionStorage.getItem('role') === 'undefined' ? undefined : sessionStorage.getItem('role'),
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    }

    async componentDidMount() {
        const response = await checkLogin();

        if (response.status === 200) {
            await this.handleSuccessfulLogin(response.data);
        }
    }

    async handleSuccessfulLogin(userData) {
        sessionStorage.setItem('userID', userData.id);
        sessionStorage.setItem('username', userData.name);
        sessionStorage.setItem('schoolName', userData.school.name);
        sessionStorage.setItem('schoolID', userData.school.id);
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('role', userData.role);

        this.context.setRole(userData.role);

        const state = Object.assign({}, this.state);
        state.username = userData.name;
        state.schoolName = userData.school.name;
        state.isLoggedIn = true;
        state.role = userData.role;
        this.setState(state);
    }

    async handleLogout() {
        sessionStorage.clear();
        await logout();
        sessionStorage.setItem('isLoggedIn', false);

        const state = Object.assign({}, this.state);

        state.username = undefined;
        state.schoolName = undefined;
        state.isLoggedIn = false;

        this.setState(state);
    }

    render(){
        return(
            <Router>
                <HeaderNew 
                    username={this.state.username}
                    schoolName={this.state.schoolName}
                    isLoggedIn={this.state.isLoggedIn}
                    handleLogout={this.handleLogout}
                />
                <div className="wrap">
                    <div className="page-header">
                        <img src={headerBackground} className="bg-img" alt="background"/>
                    </div>

                    <Switch>
                            {/* admin */}
                            <PrivateRouteAdmin path="/set-up-school" component={SetUpSchoolPage} />
                            <Route path="/create-school/step2" component={SchoolStep2} />
                            <Route path="/create-school" component={SchoolStep1} />
                            <PrivateRouteAdmin path="/admin" component={AdminHomePage}/>
                            <Route path="/admin/reset-password" component={AdminResetPW} />
                            <Route path="/admin/reset-success" component={AdminResetPWSuccess} />
                            <PrivateRouteAdmin path="/admin/set-up-success" component={SetupSchoolSuccess} />
                            <PrivateRouteAdmin path="/admin-terms" component={AdminTermsPage} />
                            <PrivateRouteAdmin path="/admin-proctor-settings" component={ProctorSettings} />
                            <Route path="/admin-login" render={
                                props => <AdminLogin
                                            {...props}
                                            onSuccessfulLogin={this.handleSuccessfulLogin}
                                />
                            } />

                            {/* professor */}
                            <Route path="/professor-login" render={
                                props => <ProfessorLogin
                                            {...props}
                                            onSuccessfulLogin={this.handleSuccessfulLogin}
                                />
                            } />
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
                            <PrivateRouteProfessor path="/professor/proctor-settings" component={ProctorSettings} />
                            {/* <PrivateRouteProfessor 
                            path="/professor/proctoring/:courseId" 
                            render={(props) => <ViewProctoring {...props} />} /> */}

                            {/* student */}
                            <Route path="/student-login" render={
                                props => <StudentLogin
                                            {...props}
                                            onSuccessfulLogin={this.handleSuccessfulLogin}
                                />
                            } />
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

                            <Route path="/student/attendanceLink" render={
                                props => <StudentAttendanceFromLink 
                                    {...props}
                                    onSuccessfulLogin={this.handleSuccessfulLogin}
                                 />
                            }/>
                            <Route path="/student/testLink" render={
                                props => <StudentTestFromLink 
                                    {...props}
                                    onSuccessfulLogin={this.handleSuccessfulLogin}
                                 />
                            }/>


                            {/* <Route path="/test" component={StudentRecordTest} />
                            <Route path="/test-error" component={StudentRecError} /> */}

                            {/* landingpage */}
                            <Route exact path='/' component={SelectRole} />
                            {/* <Route exact path='/' >
                                {(() => {
                                    if (this.state.isLoggedIn) {
                                        switch (this.state.role) {
                                            case 'Student':
                                                return <Redirect to="/student/dashboard" />;
                                            case 'Professor':
                                                return <Redirect to="/professor/course" />;
                                            case 'Admin':
                                                return <Redirect to="/admin" />;
                                            default:
                                                return <SelectRole />;
                                        }
                                    }
                                    else return <SelectRole />;
                                })()}
                            </Route> */}
                    </Switch>   
                </div>
            </Router>
        )
    }
}

export default HomePage;