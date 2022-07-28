import React from 'react';
import { Link } from 'react-router-dom';
//axios
import { Card } from '../../Resusable/Card';
import { paths } from '../../../paths';

import {ActiveStatus} from './ActiveStatus';
import {StudentCourseSession, Student, GroupedSessions } from '../types';
import { Course, InClassFlagAction } from '../../../types';

type StudentTrackingTableProps = {
  courseId: string;
  sessionId?: string;
  students: Student[];
  studentCourseSessions: StudentCourseSession[];
  course?: Course;
}

export const StudentTrackingTable: React.FC<StudentTrackingTableProps> = ({ course, courseId, sessionId, students, studentCourseSessions }) => {
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

      return copy.reduce((accum: GroupedSessions, session) => {
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

          if (course?.defaultAttendanceFlags?.includes(InClassFlagAction.phoneDisconnected) && session.device === 'mobile' && session.disconnectedTime) {
              accum[session.student].flags++;
          }

          if (course?.defaultAttendanceFlags?.includes(InClassFlagAction.computerDisconnected) && session.device === 'web' && session.disconnectedTime) {
              accum[session.student].flags++;
          }

          return accum;   
      }, {});
  }, [studentCourseSessions, course]);

return (
    <Card>
      <Card.Body>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Computer</th>
                    <th>Mobile</th>
                    <th>Flags</th>
                </tr>
            </thead>
            <tbody>
              {students.map((student) => 
                  <tr key={student._id}> 
                    <td>
                      <Link to={paths.professorInClassViewStudent({ courseId: courseId!, sessionId: sessionId!, studentId: student._id })}>{student.firstName} {student.lastName}</Link>
                    </td>
                    <td>
                      <ActiveStatus studentSessions={sessionsByStudent && sessionsByStudent[student._id]} device='web' />
                    </td>
                    <td>
                      <ActiveStatus studentSessions={sessionsByStudent && sessionsByStudent[student._id]} device='mobile' />
                    </td>
                    <td>
                      {sessionsByStudent[student._id]?.flags ?? 0}
                    </td>
                </tr>)}
            </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}
