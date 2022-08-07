import { Course } from "../../types";

export type StudentCourseSession = {
  _id: string;
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
  course: Course;
  trackingDelay: Course['defaultAttendanceTrackingDelay'],
  attendanceThreshold: Course['defaultAttendanceThreshold'],
  flagTriggers: Course['defaultAttendanceFlags'],
}

export type EngagementData = {
  time: number;
  disconnects: number;
  mobilesConnected: number;
  desktopsConnected: number;
};

export type EngagementGraphSeries = 'mobile' | 'connected' | 'disconnects';

export type StudentCourseSessions = {
  byDevice: {
      [device: string]: StudentCourseSession[];
  };
  flags: number;
};

export type GroupedSessions = {
  [studentId: string]: StudentCourseSessions
}
