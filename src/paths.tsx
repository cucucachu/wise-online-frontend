import { path } from 'static-path';

export const paths = {
  professorInClass: path("/professor/in-class/:courseId/start"),
  professorInClassPastSessions: path("/professor/in-class/:courseId/sessions"),
  professorInClassPastSessionDetail: path("/professor/in-class/:courseId/sessions/:sessionId"),

  professorCourseList: path('/professor/course'),
  professorEditCourse: path('/professor/course/edit/:courseId'),

  studentInClassCourseList: path('/student/in-class/courses'),
  studentInClassCourseDetail: path('/student/in-class/courses/:courseId'),
};
