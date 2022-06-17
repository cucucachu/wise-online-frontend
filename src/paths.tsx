import { path } from 'static-path';

export const paths = {
  professorInClass: path("/professor/in-class/:courseId/start"),
  professorInClassPastSessions: path("/professor/in-class/:courseId/sessions"),
  professorInClassPastSessionDetail: path("/professor/in-class/:courseId/sessions/:sessionId"),

  studentInClassCourseList: path('/student/in-class/courses'),
  studentInClassCourseDetail: path('/student/in-class/courses/:courseId'),
};
