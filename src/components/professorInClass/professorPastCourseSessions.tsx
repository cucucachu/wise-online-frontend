import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
//axios
import { i18n } from 'web-translate';
import { v4 as uuid } from 'uuid';
import { professorGetCourseSessions } from "../../store/axios";
import recordingIcon from "../../Assets/images/recording-icon.png";
import {paths} from "../../paths";

const editIcon = require('../../Assets/images/edit-icon.png');
// 

type Props = RouteComponentProps<{
  courseId: string;
}>

type PastCourseSession = {
  id: string;
  startTime: string;
  endTime: string;
  course: any;
};

export const ProfessorPastCourseSessions:  React.FC<Props> = ({ match }) => {
  const [loading, setLoading] = React.useState(true);
  const [course, setCourse] = React.useState<any | null>();
  const [sessions, setSessions] = React.useState<PastCourseSession[] | null>();
  const {courseId} = match.params;

  React.useEffect(() => {
      const fetch = async () => {
          const {courseSessions} = await professorGetCourseSessions(courseId);
          if (courseSessions.length) {
            setCourse(courseSessions[0].course)
          }

          setSessions(courseSessions);
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
              <h3>{course?.name} Past Classes</h3>
              <div className="shadow">
                  <table className="table table-striped">
                      <thead>
                          <tr>
                              <th>Class Start Time</th>
                              <th>Class End Time</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                        {sessions?.map((session) => 
                            <tr key={session.id}> 
                              <td>
                                {(new Date(session.startTime)).toDateString()}
                              </td>
                              <td>
                              {(new Date(session.endTime)).toDateString()}
                              </td>
                              <td>
                                <Link to={paths.professorInClassPastSessionDetail({ courseId, sessionId: session.id })}>View Class Report</Link>
                              </td>
                          </tr>)}
                      </tbody>
                  </table>
              </div>
              </div>
          </div>
      </div>
  )
}
