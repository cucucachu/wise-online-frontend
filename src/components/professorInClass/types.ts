
export type StudentCourseSession = {
  device: string;
  screenshotViolations?: string[];
  connectedTime: string;
  disconnectedTime?: string;
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
  endTime?: string;
  studentCourseSessions: StudentCourseSession[];
  students: Student[];
  course: any;
}

export type EngagementData = {
  time: number;
  disconnects: number;
  mobilesConnected: number;
  desktopsConnected: number;
};

export type EngagementGraphSeries = 'mobile' | 'connected' | 'disconnects';
