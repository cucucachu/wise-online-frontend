
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
//axios
import { i18n } from 'web-translate';
import { v4 as uuid } from 'uuid';
import { professorGetCourseSessionDetail } from "../../store/axios";
import recordingIcon from "../../Assets/images/recording-icon.png";

const editIcon = require('../../Assets/images/edit-icon.png');
// 

type Props = RouteComponentProps<{
  courseId: string;
  sessionId: string;
}>

type PastCourseSession = {
  id: string;
  startTime: string;
  endTime: string;
  course: any;
  studentCourseSessions: any[];
};

export const ProfessorPastCourseSessionDetail:  React.FC<Props> = ({ match }) => {
  const [loading, setLoading] = React.useState(true);
  const [courseSession, setCourseSession] = React.useState<PastCourseSession | null>();
  const {courseId, sessionId} = match.params;

  React.useEffect(() => {
      const fetch = async () => {
          const {courseSession} = await professorGetCourseSessionDetail(courseId, sessionId);

          setCourseSession(courseSession);
          setLoading(false);
      };

      fetch();
  }, []);


  if (loading) {
      return (
          <div className="container">
              <img src={editIcon} className="page-icon" alt="login icon"/>
              <div className="spacer-vertical" />
              <p>Loading...</p>
          </div>
      );
  }

  return(
      <div className="container">
          <img src={editIcon} className="page-icon" alt="login icon"/>
          <div className="spacer-vertical" />
          <div className="row">
              <div className="col-sm">
              <div className="shadow">
                  <table className="table table-striped">
                      <thead>
                          <tr>
                              <th>Student Name</th>
                              <th>Device</th>
                              <th>Connected Time</th>
                              <th>Disconnected Time</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                        {courseSession?.studentCourseSessions?.map((studentCourseSession) => 
                            <tr key={studentCourseSession.id}> 
                              <td>
                                {studentCourseSession.student?.firstName}
                              </td>
                              <td>
                                {studentCourseSession.device}
                              </td>
                              <td>
                              {(new Date(studentCourseSession.connectedTime)).toLocaleString()}
                              </td>
                              <td>
                              {studentCourseSession.disconnectedTime && (new Date(studentCourseSession.disconnectedTime)).toLocaleString()}
                              </td>
                          </tr>)}
                      </tbody>
                  </table>
                </div>
                {/* <pre style={{ textAlign: 'left' }}>
                {JSON.stringify(courseSession, null, 2)}
                </pre> */}
              </div>
          </div>
      </div>
  )
}
