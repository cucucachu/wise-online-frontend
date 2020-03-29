const axios = require('axios');
// const baseURL = 'http://localhost:8080/';
const baseURL = 'https://wiseonlineattend.appspot.com/' // URL for hosted backend

const backend = axios.create({
        baseURL,
        timeout: 5000,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        withCredentials: true,
        validateStatus: () => true,
})
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
    const response = await backend.post('student/login', {email, password : studentId});
    return response;
}

async function logout() {
    const response = await backend.post('student/login', {});
    return response;
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

function adminDownloadDataByCourseURL() {
    return baseURL + 'admin/courses/attendanceData';
}

function adminDownloadDataByProfessorURL() {
    return baseURL + 'admin/professors/attendanceData';
}

function adminDownloadDataByStudentURL() {
    return baseURL + 'admin/students/attendanceData';
}

/* ----------------------------------------
    Professor Routes
------------------------------------------*/

async function createCourse(classId, students) {
    const response = await backend.post('professor/createCourse', {classId, students});
    return response;
}

async function editCourse(courseId, classId) {
    const response = await backend.post('professor/editCourse', {id: courseId, classId});
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

function downloadDataForCourseURL(courseId) {
    return baseURL + 'professor/course/attendanceData/' + courseId;
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
async function submitConfidenceScore(testAttendanceId, confidenceScore) {
    const response = await backend.post('student/submitConfidenceScore', {testAttendanceId, confidenceScore});
    return response;
}

/* ----------------------------------------
    Get Routes
------------------------------------------*/

async function getCourses(school, professor) {
    const response = await backend.post('get/courses', {school, professor});
    return response;
    
}

async function getStudents(school, professor, course) {
    const response = await backend.post('get/students', {school, professor, course});
    return response;
}

async function postFiles(professorFile, studentFile) {
    var formData = new FormData();
    formData.append('professorFile', professorFile)
    formData.append('studentFile', studentFile)
    const response = await backend.post('admin/setupSchool', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
    return response;
}

export {
    adminLogin,
    professorLogin,
    studentLogin,
    logout,
    createSchool,
    claimProfessorAccount,
    adminDownloadDataByCourseURL,
    adminDownloadDataByProfessorURL,
    adminDownloadDataByStudentURL,
    createCourse,
    editCourse,
    startAttendance,
    startTest,
    downloadDataForCourseURL,
    markAttendance,
    takeTest,
    submitConfidenceScore,
    getCourses,
    getStudents,
    postFiles
}