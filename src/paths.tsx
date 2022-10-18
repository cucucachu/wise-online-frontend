import { path } from "static-path";

export const paths = {
  admin: {
    bulkDeleteProfessors: path('/admin/bulk-delete-professors'),
  },

  professorInClass: path("/professor/in-class/:courseId/start"),
  professorInClassPastSessions: path("/professor/in-class/:courseId/sessions"),
  professorInClassPastSessionDetail: path(
    "/professor/in-class/:courseId/sessions/:sessionId"
  ),
  professorInClassViewStudent: path(
    "/professor/in-class/:courseId/sessions/:sessionId/students/:studentId"
  ),

  professorCourseList: path("/professor/course"),
  professorEditCourse: path("/professor/course/edit/:courseId"),
  professorAddCourse: path("/professor/course/add"),

  studentInClassCourseList: path("/student/in-class/courses"),
  studentInClassCourseDetail: path("/student/in-class/courses/:courseId"),
};
