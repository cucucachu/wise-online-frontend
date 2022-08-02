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
  sessionsByStudent: GroupedSessions;
}

export const StudentTrackingTable: React.FC<StudentTrackingTableProps> = ({ sessionsByStudent, courseId, sessionId, students }) => {
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
