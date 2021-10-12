const axios = require('axios');
// const baseURL = 'http://localhost:8080/';
const baseURL = 'https://internal-wiseattendonline.appspot.com/' // URL for hosted backend for test

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
// const baseURL = 'https://wiseonlineattend.appspot.com/' // DO NOT USE! URL for hosted production.
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/


axios.defaults.withCredentials = true

const backend = axios.create({
    baseURL,
    timeout: 30000,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    withCredentials: true,
    validateStatus: () => true,
});

// Alter defaults after instance has been created

/* ----------------------------------------
    Logins
------------------------------------------*/

async function adminLogin(email, password) {
    const response = await backend.post('admin/login', {email, password})

    return response;
}

async function professorLogin(email, password) {
    const response = await backend.post('professor/login', {email, password});
    return response;
}

async function studentLogin(email, studentId) {
    const response = await backend.post('student/login', {email, password: studentId});
    return response;
}

async function logout() {
    const response = await backend.post('logout', {});
    return response;
}

async function checkLogin() {
    return backend.get('checkLogin');
}

/* ----------------------------------------
    Unprotected Routes
------------------------------------------*/

async function createSchool(name, setupKey, email, password) {
    const response = await backend.post('admin/createSchool', {name, setupKey, email, password});
    return response;
}

async function claimProfessorAccount(setupKey, email, password) {
    const response = await backend.post('professor/claimAccount', {setupKey, email, password});
    return response;
}

/* ----------------------------------------
    Super Routes
------------------------------------------*/

async function superGetSchoolDetails() {
    return backend.get('/super/schools');
}

async function superLoginAsAdmin(schoolId) {
    return backend.post(`/super/schools/${schoolId}`)
}

async function superCreateSchool(setupKey) {
    return backend.post('/super/school', {setupKey});
}

async function superSetAudioEnabled({schoolId, enable}) {
    return backend.post('/super/setAudioEnabled', {schoolId, enable});
}

/* ----------------------------------------
    Admin Routes
------------------------------------------*/

async function adminGetSchoolDetails() {
    return backend.get('admin/school');
}

async function postFiles(professorFile, studentFile) {
    var formData = new FormData();
    formData.append('professorFile', professorFile)
    formData.append('studentFile', studentFile)
    const response = await backend.post('admin/setupSchool', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        timeout: 60000,
    });
    return response;
}

async function addUsersPrecheck(professorFile, studentFile) {
    var formData = new FormData();
    formData.append('professorFile', professorFile)
    formData.append('studentFile', studentFile)
    const response = await backend.post('admin/setupSchool/preCheck', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        timeout: 60000,
    });
    return response;
}

async function adminRequestResetPW(email) {
    const response = await backend.post('/admin/requestPasswordReset', email);
    return response;
}
async function resetAdminPW(data) {
    const response = await backend.post('/admin/resetPassword', data)
    return response
}

function adminDownloadDataByCourseURL(termId) {
    return baseURL + 'admin/courses/attendanceData/' + termId;
}

function adminDownloadDataByProfessorURL(termId) {
    return baseURL + 'admin/professors/attendanceData/' + termId;
}

function adminDownloadDataByStudentURL(termId) {
    return baseURL + 'admin/students/attendanceData/' + termId;
}

async function adminEditTerm(termId, name) {
    const response = await backend.post('/admin/terms/edit', {termId, name})
    return response;
}

async function adminGetProctorConfiguration() {
    return backend.get('/admin/proctorConfiguration');
}

async function adminSetProctorConfiguration(
    {
        screenshotInterval,
        webcamInterval,
        facialRecognitionThreshold,
        restrictedDomains,
        allowedDomains,
        allowOverride
    }
) {
    return backend.post('/admin/proctorConfiguration', {
        screenshotInterval,
        webcamInterval,
        facialRecognitionThreshold,
        restrictedDomains,
        allowedDomains,
        allowOverride
    });
}

// async function adminGetProfessors() {
//     return backend.get('/admin/school/professors');
// }

async function adminGetStudents({
    page, pageSize, firstName, lastName, email, orderBy, order,
}) {
    return backend.get(`/admin/students?page=${page}&pageSize=${pageSize}&firstName=${firstName}&lastName=${lastName}&email=${email}&orderBy=${orderBy}&order=${order}`);
}

async function adminGetProfessors({
    page, pageSize, firstName, lastName, email, orderBy, order,
}) {
    return backend.get(`/admin/professors?page=${page}&pageSize=${pageSize}&firstName=${firstName}&lastName=${lastName}&email=${email}&orderBy=${orderBy}&order=${order}`);
}

async function adminGetProfessorCourses(professorId) {
    return backend.get(`/admin/school/professors/${professorId}/courses`);
}

async function adminGetCourseDetails(courseId) {
    return backend.get(`/admin/school/courses/${courseId}`)
}

function getStudentTemplateURL() {
    return baseURL + 'admin/studentTemplate';
}

function getProfessorTemplateURL() {
    return baseURL + 'admin/professorTemplate';
}

function getStudentsCSVURL() {
    return baseURL + 'admin/csv/students';
}

function getProfessorsCSVURL() {
    return baseURL + 'admin/csv/professors';
}

async function getTerms() {
    const response = await backend.get('admin/terms');
    return response;
}

async function createTerm(name) {
    const response = await backend.post('/admin/terms/create', {name});
    return response;
}

async function setCurrentTerm(termId) {
    const response = await backend.post('/admin/terms/setAsCurrent', {termId})
    return response;
}

async function adminAddStudents(students) {
    return backend.post('/admin/students', {students});
}

async function adminAddProfessors(professors) {
    return backend.post('/admin/professors', {professors});
}

/* ----------------------------------------
    Professor Routes
------------------------------------------*/

async function createCourse(name, classId, students) {
    const response = await backend.post('professor/createCourse', {name, classId, students});
    return response;
}
async function professorRequestResetPW(email) {
    const response = await backend.post('/professor/requestPasswordReset', email);
    return response;
}
async function resetProfessorPW(data) {
    const response = await backend.post('/professor/resetPassword', data)
    return response
}

async function getAttendancesForCourse(courseId) {
    return backend.get(`/professor/courses/${courseId}/attendances`);
}

async function getAttendance(courseId, attendanceId) {
    return backend.get(`/professor/courses/${courseId}/attendances/${attendanceId}`);
}

async function editAttendance(courseId, attendanceId, studentsPresent, scheduledTime, startTime) {
    return backend.post(`/professor/courses/${courseId}/attendances/${attendanceId}`, {students: studentsPresent, scheduledTime, startTime});
}

async function setAttendanceReadyForIntegration(courseId, attendanceId) {
    return backend.post(`/professor/courses/${courseId}/attendances/${attendanceId}/readyForIntegration`);
}

async function editCourse(courseId, name, classId, integrationId) {
    if (integrationId === '') {
        integrationId = undefined;
    }

    const response = await backend.post('professor/editCourse', {id: courseId, name, classId, integrationId});
    return response;
}

async function deleteCourse(courseId) {
    const response = await backend.post('professor/deleteCourse', {courseId});
    return response;
}

async function startAttendance(courseId) {
    const response = await backend.post('professor/startAttendance', {courseId});
    return response;
}

async function startTest(courseId) {
    const response = await backend.post('professor/startTest', {courseId});
    return response;
}

async function professorGetProctorConfiguration() {
    return backend.get('/professor/proctorConfiguration');
}

async function professorSetProctorConfiguration(
    {
        screenshotInterval,
        webcamInterval,
        facialRecognitionThreshold,
        restrictedDomains,
        allowedDomains,
    }
) {
    return backend.post('/professor/proctorConfiguration', {
        screenshotInterval,
        webcamInterval,
        facialRecognitionThreshold,
        restrictedDomains,
        allowedDomains,
    });
}

async function professorProctorConfigurationAllowed() {
    return backend.get('/professor/proctorConfigurationAllowed');
}

function downloadDataForCourseURL(courseId) {
    return baseURL + 'professor/course/attendanceData/' + courseId;
}

async function getImage(testAttendanceId, imageNumber) {
    const response = await backend.get(`professor/testResults/${testAttendanceId}/images/${imageNumber}`);
    const image = response.data;
    return image;
}

async function getScreenshot(testAttendanceId, screenshotNumber) {
    const response = await backend.get(`professor/testResults/${testAttendanceId}/screenshots/${screenshotNumber}`);
    const image = response.data;
    return image;
}

/* ----------------------------------------
    Student Routes
------------------------------------------*/

async function markAttendance(classId, keyCode) {
    const response = await backend.post('student/markAttendance', {classId, keyCode});
    return response;
}

async function takeTest(classId, keyCode) {
    const response = await backend.post('student/takeTest', {classId, keyCode});
    return response;
}

// testAttendanceId will be returned as part of the response from takeTest()
async function submitConfidenceScore(testAttendanceId, confidenceScore, numberOfPeople, image) {
    const response = await backend.post('student/submitConfidenceScore', {testAttendanceId, confidenceScore, numberOfPeople, image});
    return response;
}

// testAttendanceId will be returned as part of the response from takeTest()
async function submitScreenshot(testAttendanceId, screenshot) {
    const response = await backend.post('student/submitScreenshot', {testAttendanceId, screenshot});
    return response;
}

async function submitAudio(audioFormData, proctorDetailsId) {
    const response = await backend.post(`/student/submitAudio/proctorDetails/${proctorDetailsId}`, audioFormData, {
        headers: {"Content-Type": "multipart/form-data"},
    });

    return response;
}

async function submitTabs(testAttendanceId, tabs) {
    const response = await backend.post('student/submitTabs', {testAttendanceId, tabs});
    return response;
}

async function submitProctoringError(testAttendanceId, errorMessage) {
    const response = await backend.post('student/submitProctoringError', {testAttendanceId, errorMessage});
    return response;
}

async function submitFeeWaive(data) {
    const response = await backend.post('student/waiveFee', data);
    return response;
}
async function studentAgreeToTerms() {
    const response = await backend.post('/student/agreeToTerms')
    return response;
}

/* ----------------------------------------
    Get Routes
------------------------------------------*/

async function getCourses() {
    const response = await backend.get('courses');
    return response;

}

async function getTestsByCourse(professor, data) {
    const response = await backend.get(`/professor/courses/${data}/tests`, professor);
    return response;
}

async function getTestResults(professor, data) {
    const response = await backend.get(`/professor/tests/${data}/results`, {professor, data});
    return response;
}
async function getTestImage(testId, imgNum) {
    const response = await backend.get(`/professor/testResults/${testId}/images/${imgNum}`);
    return response;
}

async function getStudents(school, professor, course) {
    const response = await backend.post('get/students', {school, professor, course});
    return response;
}
async function getSchoolNames() {
    const response = await backend.get('schools/active');
    return response;
}

/* ----------------------------------------
    Proctoring V2.0 Routes
------------------------------------------*/

async function proctoringSchoolAllowsAudio() {
    return backend.get('proctor/audioAllowed');
}

async function proctoringProfessorCreateTest(
    {
        courseId,
        publicKey,
        testName,
        testLink,
        testPassword,
        screenshotInterval,
        webcamInterval,
        facialRecognitionThreshold,
        audioEnabled,
    }) {
    return backend.post('proctor/test', {
        courseId,
        publicKey,
        testName,
        testLink,
        testPassword,
        screenshotInterval,
        webcamInterval,
        facialRecognitionThreshold,
        audioEnabled,
    });
}

async function proctoringStudentStartTest({classId, keyCode}) {
    return backend.post('proctor/start', {classId, keyCode});
}

async function proctoringVerifyPrivileges({proctorSessionId, webcamPrivilege, screenshotPrivilege, microphonePrivilege}) {
    return backend.post('proctor/privileges', {proctorSessionId, webcamPrivilege, screenshotPrivilege, microphonePrivilege})
}

async function proctoringSetReferenceImage({proctorSessionId, webcamImage}) {
    return backend.post('proctor/reference', {proctorSessionId, webcamImage});
}

async function proctoringSubmitProctorData({proctorSessionId, webcamImage, screenshotImage, voiceDetected}) {
    return backend.post('proctor/submit', {proctorSessionId, webcamImage, screenshotImage, voiceDetected});
}

async function proctoringEndProctorSession({proctorSessionId}) {
    return backend.post('proctor/end', {proctorSessionId});
}

async function proctoringGetTestsForCourse(courseId) {
    return backend.get(`proctor/courses/${courseId}/tests`);
}

async function proctoringGetTestDetails(testId) {
    return backend.get(`proctor/tests/${testId}`);
}

async function proctoringGetStudentTestDetails(studentTestId) {
    return backend.get(`proctor/studentTests/${studentTestId}`);
}

async function proctoringGetStudentTestDetailsAndImages({studentTestId, start, pageSize}) {
    return backend.get(`/proctor/studentTest/${studentTestId}/details?start=${start}&pageSize=${pageSize}`, {
        timeout: 0,
    });
}

function proctoringGetWebcamImageURL({studentTestId, index}) {
    return `${baseURL}proctor/studentTest/${studentTestId}/details/webcam?index=${index}`;
}

function proctoringGetScreenshotImageURL({studentTestId, index}) {
    return `${baseURL}proctor/studentTest/${studentTestId}/details/screenshot?index=${index}`;
}

function proctoringGetAudioURL({studentTestId, index}) {
    return `${baseURL}proctor/studentTest/${studentTestId}/details/audio?index=${index}`;
}

export {
    adminLogin,
    professorLogin,
    studentLogin,
    logout,
    checkLogin,
    superLoginAsAdmin,
    superGetSchoolDetails,
    superCreateSchool,
    superSetAudioEnabled,
    createSchool,
    claimProfessorAccount,
    adminGetSchoolDetails,
    adminDownloadDataByCourseURL,
    adminDownloadDataByProfessorURL,
    adminDownloadDataByStudentURL,
    professorGetProctorConfiguration,
    professorSetProctorConfiguration,
    professorProctorConfigurationAllowed,
    adminGetProctorConfiguration,
    adminSetProctorConfiguration,
    adminGetProfessors,
    adminGetStudents,
    adminGetProfessorCourses,
    adminGetCourseDetails,
    adminAddStudents,
    adminAddProfessors,
    getStudentTemplateURL,
    getProfessorTemplateURL,
    getStudentsCSVURL,
    getProfessorsCSVURL,
    createCourse,
    editCourse,
    deleteCourse,
    startAttendance,
    startTest,
    downloadDataForCourseURL,
    markAttendance,
    getAttendancesForCourse,
    getAttendance,
    editAttendance,
    setAttendanceReadyForIntegration,
    takeTest,
    submitAudio,
    submitConfidenceScore,
    submitScreenshot,
    submitTabs,
    submitProctoringError,
    getCourses,
    getStudents,
    postFiles,
    addUsersPrecheck,
    adminRequestResetPW,
    professorRequestResetPW,
    getSchoolNames,
    submitFeeWaive,
    resetAdminPW,
    resetProfessorPW,
    studentAgreeToTerms,
    getImage,
    getScreenshot,
    getTestsByCourse,
    getTestResults,
    getTestImage,
    getTerms,
    adminEditTerm,
    createTerm,
    setCurrentTerm,
    proctoringSchoolAllowsAudio,
    proctoringProfessorCreateTest,
    proctoringStudentStartTest,
    proctoringVerifyPrivileges,
    proctoringSetReferenceImage,
    proctoringSubmitProctorData,
    proctoringEndProctorSession,
    proctoringGetTestsForCourse,
    proctoringGetTestDetails,
    proctoringGetStudentTestDetails,
    proctoringGetStudentTestDetailsAndImages,
    proctoringGetWebcamImageURL,
    proctoringGetScreenshotImageURL,
    proctoringGetAudioURL,
}
