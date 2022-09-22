import { Course } from "../../types";

export type StudentCourseSessionScreenshotDetail = {
  timestamp: string;
  unknownDomains: string[];
  _id: string;
}

export type StudentCourseSession = {
  _id: string;
  device: string;
  screenshotViolations?: string[];
  connectedTime: string;
  disconnectedTime?: string;
  student: string;
  screenshotDetails: StudentCourseSessionScreenshotDetail[];
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
  flagTriggers: Course['defaultAttendanceFlags'],
}

export type EngagementData = {
  time: number;
  disconnects: number;
  mobilesConnected: number;
  desktopsConnected: number;
  flaggedStudents: string[];
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

export type GroupedFlaggedURLS = {
  url: string;
  intervals: Array<{
    screenshotDetailId: string;
    start: Date;
    end: Date;
  }>;
}
