import axios, { AxiosResponse } from 'axios';
import { createBrowserHistory } from 'history';
import { apiUrl } from '../config/apiUrl';
import { Course } from '../types';

axios.defaults.withCredentials = true

const backend = axios.create({
    baseURL: apiUrl,
    timeout: 30000,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    withCredentials: true,
    validateStatus: () => true,
});

backend.interceptors.response.use(response => {
    if (response.status === 401) {
        createBrowserHistory().push('/');
    }

    return response;
}, (error) => error);

// Alter defaults after instance has been created

/* ----------------------------------------
    Logins
------------------------------------------*/

async function adminLogin(email: string, password: string) {
    const response = await backend.post('admin/login', {email, password})

    return response;
}

async function professorLogin(email: string, password: string) {
    const response = await backend.post('professor/login', {email, password});
    return response;
}

async function studentLogin(email: string, studentId: string) {
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

async function createSchool(name: string, setupKey: string, email: string, password: string) {
    const response = await backend.post('admin/createSchool', {name, setupKey, email, password});
    return response;
}

async function claimProfessorAccount(setupKey: string, email: string, password: string) {
    const response = await backend.post('professor/claimAccount', {setupKey, email, password});
    return response;
}

/* ----------------------------------------
    Super Routes
------------------------------------------*/

async function superGetSchoolDetails() {
    return backend.get('/super/schools');
}

async function superGetSchoolTestCounts() {
    return backend.get('/super/schools/tests');
}

async function superLoginAsAdmin(schoolId: string) {
    return backend.post(`/super/schools/${schoolId}`)
}

async function superCreateSchool({setupKey, adminEmail, billingType, unitPrice, billingFrequency}: any) {
    return backend.post('/super/school', {setupKey, adminEmail, billingType, unitPrice, billingFrequency});
}

async function superSetAudioEnabled({schoolId, enable}: any) {
    return backend.post('/super/setAudioEnabled', {schoolId, enable});
}

async function superUpdateSchool(schoolData: any) {
    return backend.post('/super/updateSchool', schoolData);
}

/* ----------------------------------------
    Admin Routes
------------------------------------------*/

async function adminGetSchoolDetails() {
    return backend.get('admin/school');
}

async function postFiles(professorFile: any, studentFile: any, autoRenew: any) {
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

async function addUsersPrecheck(professorFile: any, studentFile: any) {
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

async function adminRequestResetPW(email: string) {
    const response = await backend.post('/admin/requestPasswordReset', email);
    return response;
}
async function resetAdminPW(data: any) {
    const response = await backend.post('/admin/resetPassword', data)
    return response
}

function adminDownloadDataByCourseURL(termId: string) {
    return apiUrl + 'admin/courses/attendanceData/' + termId;
}

function adminDownloadDataByProfessorURL(termId: string) {
    return apiUrl + 'admin/professors/attendanceData/' + termId;
}

function adminDownloadDataByStudentURL(termId: string) {
    return apiUrl + 'admin/students/attendanceData/' + termId;
}

async function adminEditTerm(termId: string, name: string) {
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
    }: any
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

async function adminGetSchoolTests() {
    return backend.get('admin/tests');
}

// async function adminGetProfessors() {
//     return backend.get('/admin/school/professors');
// }

async function adminGetStudents({
    page, pageSize, firstName, lastName, email, orderBy, order,
}: any) {
    return backend.get(`/admin/students?page=${page}&pageSize=${pageSize}&firstName=${firstName}&lastName=${lastName}&email=${email}&orderBy=${orderBy}&order=${order}`);
}

async function adminGetProfessors({
    page, pageSize, firstName, lastName, email, orderBy, order,
}: any) {
    return backend.get(`/admin/professors?page=${page}&pageSize=${pageSize}&firstName=${firstName}&lastName=${lastName}&email=${email}&orderBy=${orderBy}&order=${order}`);
}

async function adminGetProfessorCourses(professorId: string) {
    return backend.get(`/admin/school/professors/${professorId}/courses`);
}

async function adminGetCourseDetails(courseId: string) {
    return backend.get(`/admin/school/courses/${courseId}`)
}

function getStudentTemplateURL() {
    return apiUrl + 'admin/studentTemplate';
}

function getProfessorTemplateURL() {
    return apiUrl + 'admin/professorTemplate';
}

function getStudentsCSVURL() {
    return apiUrl + 'admin/csv/students';
}

function getProfessorsCSVURL() {
    return apiUrl + 'admin/csv/professors';
}

async function getTerms() {
    const response = await backend.get('admin/terms');
    return response;
}

async function createTerm(name: string) {
    const response = await backend.post('/admin/terms/create', {name});
    return response;
}

async function setCurrentTerm(termId: string) {
    const response = await backend.post('/admin/terms/setAsCurrent', {termId})
    return response;
}

async function adminAddStudents(students: any) {
    return backend.post('/admin/students', {students});
}

async function adminAddProfessors(professors: any) {
    return backend.post('/admin/professors', {professors});
}

/* ----------------------------------------
    Professor Routes
------------------------------------------*/

async function createCourse(name: string, classId: string, students?: string) {
    const response = await backend.post('professor/createCourse', {name, classId, students});
    return response;
}

export async function getCourse(courseId: string): Promise<Course> {
    const response = await backend.get(`professor/course/${courseId}`);
    return response.data.course;
}

async function professorRequestResetPW(email: string) {
    const response = await backend.post('/professor/requestPasswordReset', email);
    return response;
}
async function resetProfessorPW(data: string) {
    const response = await backend.post('/professor/resetPassword', data)
    return response
}

async function getAttendancesForCourse(courseId: string) {
    return backend.get(`/professor/courses/${courseId}/attendances`);
}

async function getAttendance(courseId: string, attendanceId: string) {
    return backend.get(`/professor/courses/${courseId}/attendances/${attendanceId}`);
}

async function editAttendance(courseId: string, attendanceId: string, studentsPresent: string, scheduledTime: string, startTime: string) {
    return backend.post(`/professor/courses/${courseId}/attendances/${attendanceId}`, {students: studentsPresent, scheduledTime, startTime});
}

async function setAttendanceReadyForIntegration(courseId: string, attendanceId: string) {
    return backend.post(`/professor/courses/${courseId}/attendances/${attendanceId}/readyForIntegration`);
}

async function editCourse(courseId: string, data: {
    name: string,
    classId: string,
    integrationId: string | null | undefined,
    allowedUrls?: string[],
    defaultAttendanceTrackingDelay?: number;
    defaultAttendanceThreshold?: number;
    defaultAttendanceFlags?: string[];
    accessCode?: string,
}) {
    if (data.integrationId === '') {
        data.integrationId = undefined;
    }

    const response = await backend.post('professor/editCourse', {id: courseId, ...data});
    return response;
}

async function deleteCourse(courseId: string) {
    const response = await backend.post('professor/deleteCourse', {courseId});
    return response;
}

async function startAttendance(courseId: string) {
    const response = await backend.post('professor/startAttendance', {courseId});
    return response;
}

async function startTest(courseId: string) {
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
    }: any
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

function downloadDataForCourseURL(courseId: string) {
    return apiUrl + 'professor/course/attendanceData/' + courseId;
}

async function getImage(testAttendanceId: string, imageNumber: string) {
    const response = await backend.get(`professor/testResults/${testAttendanceId}/images/${imageNumber}`);
    const image = response.data;
    return image;
}

async function getScreenshot(testAttendanceId: string, screenshotNumber: string) {
    const response = await backend.get(`professor/testResults/${testAttendanceId}/screenshots/${screenshotNumber}`);
    const image = response.data;
    return image;
}

export async function professorGetCourseSessions(courseId: string) {
    const response = await backend.get(`/professor/course/${courseId}/sessions`);
    return response.data;
}

export async function professorGetCourseSessionDetail(courseId: string, sessionId: string) {
    const response = await backend.get(`/professor/course/${courseId}/sessions/${sessionId}`);
    handleResponse(response);
    return response.data;
}

export async function professorGetCourseSessionDetailForStudent(courseId: string, sessionId: string, studentId: string) {
    const response = await backend.get(`/professor/course/${courseId}/sessions/${sessionId}/students/${studentId}`);
    handleResponse(response);
    return response.data;
}

export async function professorGetCurrentSession(courseId: string) {
    const response = await backend.get(`/professor/course/${courseId}/session`);
    handleResponse(response);
    return response.data;
}

export async function professorStartCourseSession(courseId: string) {
    const response = await backend.post(`/professor/course/${courseId}/session`);
    handleResponse(response);
    return response.data;
}

export async function professorStopCourseSession(courseId: string) {
    await backend.post(`/professor/course/${courseId}/session/stop`);
}

export async function professorUpdateCourseSession(courseId: string, { allowedUrls }: { allowedUrls: string[] }) {
    const response = await backend.put(`/professor/course/${courseId}/session`, {
        allowedUrls,
    });

    return response.data;
}

/* ----------------------------------------
    Student Routes
------------------------------------------*/

async function markAttendance(classId: string, keyCode: string) {
    const response = await backend.post('student/markAttendance', {classId, keyCode});
    return response;
}

async function takeTest(classId: string, keyCode: string) {
    const response = await backend.post('student/takeTest', {classId, keyCode});
    return response;
}

// testAttendanceId will be returned as part of the response from takeTest()
async function submitConfidenceScore(testAttendanceId: string, confidenceScore: any, numberOfPeople: any, image: any) {
    const response = await backend.post('student/submitConfidenceScore', {testAttendanceId, confidenceScore, numberOfPeople, image});
    return response;
}

// testAttendanceId will be returned as part of the response from takeTest()
async function submitScreenshot(testAttendanceId: string, screenshot: any) {
    const response = await backend.post('student/submitScreenshot', {testAttendanceId, screenshot});
    return response;
}

async function submitAudio(audioFormData: any, proctorDetailsId: any) {
    const response = await backend.post(`/student/submitAudio/proctorDetails/${proctorDetailsId}`, audioFormData, {
        headers: {"Content-Type": "multipart/form-data"},
    });

    return response;
}

async function submitTabs(testAttendanceId: string, tabs: any) {
    const response = await backend.post('student/submitTabs', {testAttendanceId, tabs});
    return response;
}

async function submitProctoringError(testAttendanceId: string, errorMessage: string) {
    const response = await backend.post('student/submitProctoringError', {testAttendanceId, errorMessage});
    return response;
}

async function submitFeeWaive(data: string) {
    const response = await backend.post('student/waiveFee', data);
    return response;
}
async function studentAgreeToTerms() {
    const response = await backend.post('/student/agreeToTerms')
    return response;
}

const handleResponse = <T extends unknown>(response: AxiosResponse<T>) => {
    if (response.status !== 200) {
        throw new Error((response.data as any).error);
    }
}

export async function studentJoinCourse({ classId, keyCode }: { classId: string, keyCode: string }) {
    const response = await backend.post('/student/courses/join', { classId, keyCode });
    handleResponse(response);
    return response.data;
}

export async function studentGetCourse(courseId: string) {
    const response = await backend.get(`/student/courses/${courseId}`);
    return response.data;
}

// Routes for InClass Product

export async function submitScreenshotForInClass(socketId: string, screenshot: any) {
    const response = await backend.post('student/courses/submitScreenshot', {socketId, screenshot});
    return response;
}

export async function getStudentCourses(): Promise<Course[]> {
    const response = await backend.get('/student/courses');
    return response.data.courses;
}

/* ----------------------------------------
    Get Routes
------------------------------------------*/

async function getCourses() {
    const response = await backend.get('courses');
    return response;

}

async function getTestsByCourse(professor: any, data: any) {
    const response = await backend.get(`/professor/courses/${data}/tests`, professor);
    return response;
}

async function getTestResults(professor: any, data: any) {
    const response = await backend.get(`/professor/tests/${data}/results`);
    return response;
}
async function getTestImage(testId: any, imgNum: any) {
    const response = await backend.get(`/professor/testResults/${testId}/images/${imgNum}`);
    return response;
}

async function getStudents(school: any, professor: any, course: any) {
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
    }: any) {
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

async function proctoringStudentStartTest({classId, keyCode}: any) {
    return backend.post('proctor/start', {classId, keyCode});
}

async function proctoringVerifyPrivileges({proctorSessionId, webcamPrivilege, screenshotPrivilege, microphonePrivilege}: any) {
    return backend.post('proctor/privileges', {proctorSessionId, webcamPrivilege, screenshotPrivilege, microphonePrivilege})
}

async function proctoringSetReferenceImage({proctorSessionId, webcamImage}: any) {
    return backend.post('proctor/reference', {proctorSessionId, webcamImage});
}

async function demoProctoringSetReferenceImage({webcamImage}: any) {
    return backend.post('proctor/demo/reference', {webcamImage});
}

async function proctoringSubmitProctorData({proctorSessionId, webcamImage, screenshotImage, voiceDetected}: any) {
    return backend.post('proctor/submit', {proctorSessionId, webcamImage, screenshotImage, voiceDetected});
}

async function proctoringEndProctorSession({proctorSessionId}: any) {
    return backend.post('proctor/end', {proctorSessionId});
}

async function proctoringGetTestsForCourse(courseId: any) {
    return backend.get(`proctor/courses/${courseId}/tests`);
}

async function proctoringGetTestDetails(testId: any) {
    return backend.get(`proctor/tests/${testId}`);
}

async function proctoringGetStudentTestDetails(studentTestId: any) {
    return backend.get(`proctor/studentTests/${studentTestId}`);
}

async function proctoringGetStudentTestDetailsAndImages({studentTestId, start, pageSize}: any) {
    return backend.get(`/proctor/studentTest/${studentTestId}/details?start=${start}&pageSize=${pageSize}`, {
        timeout: 0,
    });
}

function proctoringGetWebcamImageURL({studentTestId, index}: any) {
    return `${apiUrl}proctor/studentTest/${studentTestId}/details/webcam?index=${index}`;
}

function proctoringGetScreenshotImageURL({studentTestId, index}: any) {
    return `${apiUrl}proctor/studentTest/${studentTestId}/details/screenshot?index=${index}`;
}

function proctoringGetAudioURL({studentTestId, index}: any) {
    return `${apiUrl}proctor/studentTest/${studentTestId}/details/audio?index=${index}`;
}

export {
    adminLogin,
    professorLogin,
    studentLogin,
    logout,
    checkLogin,
    superLoginAsAdmin,
    superGetSchoolDetails,
    superGetSchoolTestCounts,
    superCreateSchool,
    superSetAudioEnabled,
    superUpdateSchool,
    createSchool,
    claimProfessorAccount,
    adminGetSchoolDetails,
    adminDownloadDataByCourseURL,
    adminDownloadDataByProfessorURL,
    adminDownloadDataByStudentURL,
    professorGetProctorConfiguration,
    professorSetProctorConfiguration,
    adminGetSchoolTests,
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
    demoProctoringSetReferenceImage,
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
