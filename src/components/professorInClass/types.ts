
export type StudentCourseSession = {
  device: string;
  screenshotViolations: string[];
  connectedTime: string;
  disconnectedTime: string;
  student: string;
}

export type Student = {
  _id: string;
  firstName: string;
  lastName: string;
}

export type CourseSession = {
  id: string;
  classId: string;
  keyCode: string;
  allowedUrls: string[];
  startTime: string;
  studentCourseSessions: StudentCourseSession[];
  students: Student[];
  course: any;
}
