const axios = require('axios');
//const baseURL = 'http://localhost:8000/';
const baseURL = 'https://wiseonlineattend.appspot.com/' // URL for hosted backend

// return axios.get('/api/employees', { proxy: { host: '127.0.0.1', port: 1337 } }) .then(res => { }) .catch(err => console.log(err));

const backend = axios.create({
        baseURL,
        timeout: 5000,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        withCredentials: true,
        validateStatus: status => true,
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

/* ----------------------------------------
    Professor Routes
------------------------------------------*/

async function createCourse(classId, students) {
    const response = await backend.post('professor/createCourse', {classId, students});
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

export {
    adminLogin,
    professorLogin,
    studentLogin,
    logout,
    createSchool,
    claimProfessorAccount,
    createCourse,
    startAttendance,
    startTest,
    markAttendance,
    takeTest,
    submitConfidenceScore,
    getCourses,
    getStudents,
}