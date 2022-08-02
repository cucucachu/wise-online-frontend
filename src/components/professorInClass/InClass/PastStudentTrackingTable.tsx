import React from 'react';
import {StudentCourseSession, Student, GroupedSessions } from '../types';
import { Course, InClassFlagAction } from '../../../types';
import {StudentTrackingTable} from './StudentTrackingTable'

type PastStudentTrackingTableProps = {
  courseId: string;
  sessionId?: string;
  students: Student[];
  studentCourseSessions: StudentCourseSession[];
  course?: Course;
}

export const PastStudentTrackingTable: React.FC<PastStudentTrackingTableProps> = ({ course, courseId, sessionId, students, studentCourseSessions }) => {
  const sessionsByStudent = React.useMemo(() => {
      const copy = [...studentCourseSessions];
      copy.sort((a, b) => {
          if (!a.disconnectedTime) {
              return 1;
          }

          if (!b.disconnectedTime) {
              return -1;
          }

          return (new Date(a.disconnectedTime)).getTime() - (new Date(b.disconnectedTime)).getTime()
      });

      return copy.reduce((accum: GroupedSessions, session, index) => {
          if (!accum[session.student]) {
              accum[session.student] = {
                  byDevice: {},
                  flags: 0,
              };
          }

          if (!accum[session.student].byDevice[session.device]) {
              accum[session.student].byDevice[session.device] = []
          }

          accum[session.student].byDevice[session.device].push(session);
          if (course?.defaultAttendanceFlags?.includes(InClassFlagAction.nonAllowedUrl)) {
              accum[session.student].flags += session.screenshotViolations?.length ?? 0;
          }

          const isLastSession = index === copy.length - 1;
          if (course?.defaultAttendanceFlags?.includes(InClassFlagAction.phoneDisconnected) && session.device === 'mobile' && session.disconnectedTime && !isLastSession) {
              accum[session.student].flags++;
          }

          if (course?.defaultAttendanceFlags?.includes(InClassFlagAction.computerDisconnected) && session.device === 'web' && session.disconnectedTime && !isLastSession) {
              accum[session.student].flags++;
          }

          return accum;   
      }, {});
  }, [studentCourseSessions, course]);

return (
    <StudentTrackingTable
      courseId={courseId}
      students={students}
      sessionsByStudent={sessionsByStudent}
      sessionId={sessionId}
    />
  );
}
