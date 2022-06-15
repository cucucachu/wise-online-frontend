import { path } from 'static-path';

export const paths = {
  professorInClass: path("/professor/in-class/:courseId/start"),

  studentInClassCourseList: path('/student/in-class/courses'),
  studentInClassCourseDetail: path('/student/in-class/courses/:courseId'),
};
