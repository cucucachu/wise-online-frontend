import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SuperDashboard from "../components/SuperDashboard";
import SuperSchoolSettings from "../components/SuperSchoolSettings";
import {SuperRunAuditReport} from "../components/Super/RunAuditReport";

//components
import {ProfessorLogin} from "../components/professorLogin";
import ProfessorCourse from "../components/professorCourses/ProfessorCourseList";
import ProfessorAttendanaceStart from "../components/professorAttendanceStart";
import ProfessorAttendanacesView from "../components/professorAttendancesView";

import ProfessorClassStart from "../components/professorInClass/professorStartClass";
import { ProfessorPastCourseSessions } from "../components/professorInClass/professorPastCourseSessions";
import { ProfessorPastCourseSessionDetail } from "../components/professorInClass/professorPastCourseSessionDetail";
import { ProfessorInClassViewStudent } from "../components/professorInClass/ProfessorInClassViewStudent";
import { ProfessorEditCourse } from "../components/professorCourses/ProfessorEditCourse";
import { ProfessorAddCourse } from "../components/professorCourses/ProfessorAddCourse";

import AttendanaceView from "../components/AttendanceView";
import ProfessorClaim from "../components/professorClaim";
import ProfessorExam from "../components/professorExam";
import ProfessorClaimSuccess from "../components/professorClaimSuccess";
import ProctorSettings from "../components/ProctorSettings";
import ProfessorTestsForCourse from "../components/ProfessorTestsForCourse";
import ProfessorTestView from "../components/ProfessorTestView";
import ProfessorViewStudentTest from "../components/ProfessorViewStudentTest";

import { StudentDashboard } from "../components/studentDashboard";
import StudentClass from "../components/studentClass";
import StudentClassAtt from "../components/studentClassAtt";
import StudentLogin from "../components/studentLogin";
import StudentTest from "../components/studentTest";
import {StudentAttSuccess} from "../components/studentAttSuccess";
import StudentRecordTest from "../components/StudentRecordTest";
import StudentTestId from "../components/studentTestId";
import StudentRecError from "../components/studentRecordingError";
import StudentAttendanceFromLink from "../components/StudentAttendanceFromLink";
import StudentTestFromLink from "../components/StudentTestFromLink";
import StudentProctoring from "../components/StudentProctoring";
import StudentProctoringDemo from "../components/StudentProctoringDemo";

import { StudentInClassCourseList } from "../components/studentInClass/StudentInClassCourseList";
import { StudentInClassLanding } from "../components/studentInClass/StudentInClassLanding";

import {AdminLogin} from "../components/adminLogin";
import SetUpSchoolPage from "../components/SetUpSchoolPage";
import {AdminBulkDeleteProfessors} from "../components/Admin/BulkDeleteProfessors";
import AdminHomePage from "../components/AdminHomePage";
import SchoolStep1 from "../components/createSchoolStep1";
import SchoolStep2 from "../components/createSchoolStep2";
import AdminProfessors from "../components/AdminProfessors";
import AdminStudents from "../components/AdminStudents";
import AdminProfessorCourses from "../components/AdminProfessorCourses";
import AdminCourseDetail from "../components/AdminCourseDetail";
import AdminAddUsers from "../components/AdminAddUsers";

import { SelectRole } from "../components/selectRole";

//contexts
// import { LanguageContext } from '../contexts/LanguageContext'

import {WiseHeader} from "../components/WiseHeader";

import PrivateRouteAdmin from "../components/PrivateRouteAdmin";
import PrivateRouteStudent from "../components/PrivateRouteStudent";
import PrivateRouteProfessor from "../components/PrivateRouteProfessor";
import StudentFeeWaive from "../components/studentFeeWaive";
import StudentFeeWaiveSelect from "../components/studentFeeWaiveSelect";
import StudentFeeWaiveForm from "../components/studentFeeWaiveForm";
import StudentFeeWaiveNote from "../components/studentFeeWaiveNote";
import StudentFeeWaiveConfirm from "../components/studentFeeWaiveConfirm";

import headerBackground from "../Assets/images/header-img-mobile.png";
import ForgotPWAdmin from "../components/forgotPWAdmin";
import ForgotPWProfessor from "../components/forgotPWProfessor";
import ForgotPWSentProfessor from "../components/forgotPWSentProfessor";
import ForgotPWSentAdmin from "../components/forgotPWSentAdmin";
import AdminResetPW from "../components/adminResetPW";
import ProfessorResetPW from "../components/professorResetPW";
import AdminResetPWSuccess from "../components/adminResetPWSuccess";
import ProfessorResetPWSuccess from "../components/professorResetPWSuccess";
import SetupSchoolSuccess from "../components/setUpSchoolSuccess";
import ViewProctoring from "../components/ProfessorViewProctoring";
import ViewTestResults from "../components/professorTestResults";
import ViewEachTestResult from "../components/ProfessorViewTestData";
import StudentRecordAgreeToTerms from "../components/studentRecordAgreeToTerms";
import StudentInstallChromeExtension from "../components/studentInstallChromeExtension";
import AdminTermsPage from "../components/AdminTerms/AdminTermsPage";

// Proctoring Components
import ProfessorStartProctoring from "../components/ProfessorStartProctoring";
import {history} from "../history";

import { paths } from "../paths";

class HomePage extends Component<any, any, any> {
  render() {
    const props: any = { history };
    return (
      <Router {...props}>
        <WiseHeader />
        <div className="wrap">
          <div className="page-header">
            <img src={headerBackground} className="bg-img" alt="background" />
          </div>

          <Switch>
            {/* super */}
            <Route
              path="/super/school/settings"
              component={SuperSchoolSettings}
            />
            <Route
              path="/super"
              component={SuperDashboard}
              exact={true}
            />
            <Route
              path={paths.superRunAuditReport({})}
              component={SuperRunAuditReport}
            />
            {/* admin */}
            <Route path="/admin/forgot-pw" component={ForgotPWAdmin} />
            <Route path="/admin/reset-pw-sent" component={ForgotPWSentAdmin} />
            <Route path="/admin/reset-password" component={AdminResetPW} />
            <Route
              path="/admin/reset-success"
              component={AdminResetPWSuccess}
            />
            <PrivateRouteAdmin
              path="/set-up-school"
              component={SetUpSchoolPage}
            />
            <Route path="/create-school/step2" component={SchoolStep2} />
            <Route path="/create-school" component={SchoolStep1} />
            <PrivateRouteAdmin
              path="/admin/addUsers"
              component={AdminAddUsers}
            />
            <PrivateRouteAdmin
              path={paths.admin.bulkDeleteProfessors.pattern}
              component={AdminBulkDeleteProfessors}
            />
            <PrivateRouteAdmin
              path="/admin/professor/courses"
              component={AdminProfessorCourses}
            />
            <PrivateRouteAdmin
              path="/admin/professors"
              component={AdminProfessors}
            />
            <PrivateRouteAdmin
              path="/admin/students"
              component={AdminStudents}
            />
            <PrivateRouteAdmin
              path="/admin/course"
              component={AdminCourseDetail}
            />
            <PrivateRouteAdmin
              path="/admin/set-up-success"
              component={SetupSchoolSuccess}
            />
            <PrivateRouteAdmin path="/admin-terms" component={AdminTermsPage} />
            <PrivateRouteAdmin
              path="/admin-proctor-settings"
              component={ProctorSettings}
            />
            <PrivateRouteAdmin path="/admin" component={AdminHomePage} />
            <Route
              path="/admin-login"
              component={AdminLogin}
            />

            {/* professor */}
            <Route
              path="/professor-login"
              component={ProfessorLogin}
            />
            <Route
              path="/professor/reset-password"
              component={ProfessorResetPW}
            />
            <Route
              path="/professor/reset-success"
              component={ProfessorResetPWSuccess}
            />
            <PrivateRouteProfessor
              exact={true}
              path={paths.professorCourseList.pattern}
              component={ProfessorCourse}
            />
            <PrivateRouteProfessor
              path={paths.professorEditCourse.pattern}
              component={ProfessorEditCourse}
            />
            <PrivateRouteProfessor
              path={paths.professorAddCourse.pattern}
              component={ProfessorAddCourse}
            />

            <Route path="/professor/claim-account" component={ProfessorClaim} />
            {/* <PrivateRouteProfessor path="/professor/claim-account-success" component={ProfessorClaimSuccess} /> */}
            <Route
              path="/professor/claim-account-success"
              component={ProfessorClaimSuccess}
            />
            <PrivateRouteProfessor
              path="/professor/attendancesView"
              component={ProfessorAttendanacesView}
            />
            <PrivateRouteProfessor
              path="/professor/attendanceView"
              component={AttendanaceView}
            />
            <PrivateRouteProfessor
              path="/professor/attendance/start"
              component={ProfessorAttendanaceStart}
            />
            <PrivateRouteProfessor
              path="/professor/exam"
              component={ProfessorExam}
            />
            <PrivateRouteProfessor
              path="/professor/proctoring/:courseId"
              component={ViewProctoring}
            />
            <PrivateRouteProfessor
              path="/professor/view-report/:testId"
              component={ViewTestResults}
            />
            <PrivateRouteProfessor
              path="/professor/view-detail"
              component={ViewEachTestResult}
            />
            <PrivateRouteProfessor
              path="/professor/proctor-settings"
              component={ProctorSettings}
            />
            <PrivateRouteProfessor
              path="/proctor/professor/start"
              component={ProfessorStartProctoring}
            />
            <PrivateRouteProfessor
              path="/proctor/tests"
              component={ProfessorTestsForCourse}
            />
            <PrivateRouteProfessor
              path="/proctor/test"
              component={ProfessorTestView}
            />
            <PrivateRouteProfessor
              path="/proctor/result"
              component={ProfessorViewStudentTest}
            />

            <PrivateRouteProfessor
              path={paths.professorInClass.pattern}
              component={ProfessorClassStart}
            />
            <PrivateRouteProfessor
              exact={true}
              path={paths.professorInClassPastSessions.pattern}
              component={ProfessorPastCourseSessions}
            />
            <PrivateRouteProfessor
              exact={true}
              path={paths.professorInClassPastSessionDetail.pattern}
              component={ProfessorPastCourseSessionDetail}
            />
            <PrivateRouteProfessor
              exact={true}
              path={paths.professorInClassViewStudent.pattern}
              component={ProfessorInClassViewStudent}
            />
            {/* <PrivateRouteProfessor 
                            path="/professor/proctoring/:courseId" 
                            render={(props) => <ViewProctoring {...props} />} /> */}

            {/* student */}
            <Route
              path="/student-login"
              component={StudentLogin}
            />
            <PrivateRouteStudent
              path="/student/dashboard"
              component={StudentDashboard}
            />
            <PrivateRouteStudent
              path="/student/proctor"
              component={StudentProctoring}
            />
            <PrivateRouteStudent
              path="/student/demo/proctor"
              component={StudentProctoringDemo}
            />
            <PrivateRouteStudent
              path="/student/classes"
              component={StudentClass}
            />
            <PrivateRouteStudent
              path="/student/tests"
              component={StudentTest}
            />
            <PrivateRouteStudent
              path="/student/class/attend"
              component={StudentClassAtt}
            />

            <PrivateRouteStudent
              path="/student/class/attend-success"
              component={StudentAttSuccess}
            />
            <Route
              path="/test-route/student-success"
              component={StudentAttSuccess}
            />
            <PrivateRouteStudent
              path="/student/test/record"
              component={StudentRecordTest}
            />
            {/* <Route path="/student/test/record" component={StudentRecordTest} /> */}
            <PrivateRouteStudent
              path="/student/test-id"
              component={StudentTestId}
            />
            <PrivateRouteStudent
              path="/student/record-agree-to-terms"
              component={StudentRecordAgreeToTerms}
            />

            <PrivateRouteStudent
              path="/student/chrome-extension"
              component={StudentInstallChromeExtension}
            />
            <PrivateRouteStudent
              path="/student/test/recording-error"
              component={StudentRecError}
            />

            <PrivateRouteStudent
              exact={true}
              path={paths.studentInClassCourseList.pattern}
              component={StudentInClassCourseList}
            />
            <PrivateRouteStudent
              exact={true}
              path={paths.studentInClassCourseDetail.pattern}
              component={StudentInClassLanding}
            />

            <Route path="/student/fee-waiver" component={StudentFeeWaive} />
            <Route
              path="/student/fee-waiver-select-school"
              component={StudentFeeWaiveSelect}
            />
            <Route
              path="/student/fee-waiver-form"
              component={StudentFeeWaiveForm}
            />
            <Route
              path="/student/fee-waiver-note"
              component={StudentFeeWaiveNote}
            />
            <Route
              path="/student/fee-waiver-confirmation"
              component={StudentFeeWaiveConfirm}
            />

            <Route path="/professor/forgot-pw" component={ForgotPWProfessor} />
            <Route
              path="/professor/reset-pw-sent"
              component={ForgotPWSentProfessor}
            />

            <Route
              path="/student/attendanceLink"
              component={StudentAttendanceFromLink}
            />
            <Route
              path="/student/testLink"
              component={StudentTestFromLink}
            />
            <Route exact path="/" component={SelectRole} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default HomePage;
