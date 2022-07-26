import * as React from 'react'
import {RouteComponentProps} from 'react-router-dom'
import { getStudentCourses } from "../../store/axios";
import {Course} from '../../types';
import { CodeEntry } from '../Resusable/CodeEntry';
import attendClass from '../../Assets/images/attend-class.png';
import { studentJoinCourse } from '../../store/axios';
// import {CodeEntry} from './Resusable/CodeEntry';

import { i18n } from 'web-translate';
import { paths } from '../../paths';

export const StudentInClassCourseList: React.FC<RouteComponentProps> = ({ history }) => {
  const [courses, setCourses] = React.useState<Course[]>([]);

  const fetch = React.useCallback(async () => {
    const resp = await getStudentCourses();
    setCourses(resp ?? []);
  }, [setCourses]);

  React.useEffect(() => {
    fetch();
  }, []);

  const [joinErrorMessage, setJoinErrorMessage] = React.useState<string | undefined>();
  const [classId, setClassId] = React.useState('');

  const [keyCode1, setKeyCode1] = React.useState('');
  const [keyCode2, setKeyCode2] = React.useState('');
  const [keyCode3, setKeyCode3] = React.useState('');
  const [keyCode4, setKeyCode4] = React.useState('');
  const handleSubmit = React.useCallback(async (e: any) => {
    e.preventDefault();
    setJoinErrorMessage(undefined);

    try {
      const keyCode = [keyCode1, keyCode2, keyCode3, keyCode4].join('');
      const {course} = await studentJoinCourse({ classId, keyCode });
      setCourses(courses.concat(course));
      setKeyCode1('');
      setKeyCode2('');
      setKeyCode3('');
      setKeyCode4('');
      setClassId('');

      await fetch();
    } catch (error) {
      setJoinErrorMessage((error as Error).message);
    }
  }, [keyCode1, keyCode2, keyCode3, keyCode4, classId, fetch, courses, setCourses]);

  return (
    <div className="container">
      <img src={attendClass} className="page-icon" alt="login icon"/>
      <div className="spacer-vertical" />
      <h1>{i18n("Your Courses")}</h1>
      <div className="row">
          <div className="col-sm">
          <div className="shadow">
            <table className="table table-striped">
              <thead>
                  <tr>
                      <th>Course Name</th>
                      <th>Professor</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td>Professor {course.professor?.lastName}</td>
                    <td>
                      {course.isInSession && <a href={paths.studentInClassCourseDetail({courseId: course.id })}>Attend Class</a>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
      </div>
      <div className="spacer-vertical" />
      <h4 className="bold">{i18n('Join New Course')}</h4>
      <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            {joinErrorMessage && <div>{joinErrorMessage}</div>}
            <span className="input-label">{i18n("Class ID")}</span>
            <input id="classID" type="text" placeholder={i18n("Class ID")} className="" name="classID" value={classId} onChange={(e) => setClassId(e.target.value)} required/>
          </div>
          <div className="container-note input-wrapper">
            <div className="space-adjust-2">
              <p className="text-left tooltip-login" ><span className="tooltip-show">{i18n("What is my class ID?")}<br/>
                  <span className="tooltiptext">
                  {i18n("The class ID is needed to ensure you have authorization to join a class, and can only be obtained from your instructor.")}
                  </span>
                </span>
              </p>
            </div>
            
          </div>
          <div className="spacer-vertical" />
          <CodeEntry
            keyCode1={keyCode1}
            keyCode2={keyCode2}
            keyCode3={keyCode3}
            keyCode4={keyCode4}
            onChangeKeyCode1={setKeyCode1}
            onChangeKeyCode2={setKeyCode2}
            onChangeKeyCode3={setKeyCode3}
            onChangeKeyCode4={setKeyCode4}
          />
          
          <div className="spacer-vertical" />
          <input type="submit" className="btn-att" value={i18n("Join")} />
      </form>
  </div>
  )
};
