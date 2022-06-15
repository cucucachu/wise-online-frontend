import * as React from 'react'
import io, {Socket} from 'socket.io-client';
import {RouteComponentProps} from 'react-router-dom'

import { getStudentCourses, Course } from "../../store/axios";
import { CodeEntry } from '../Resusable/CodeEntry';
import {studentGetCourse} from '../../store/axios';
// import {CodeEntry} from './Resusable/CodeEntry';

import { i18n } from 'web-translate';
const attendClass = require('../../Assets/images/attend-class.png');

type StudentInClassLandingProps = RouteComponentProps<{
  courseId: string;
}>

export const StudentInClassLanding: React.FC<StudentInClassLandingProps> = ({ match }) => {
  const {courseId} = match.params;
  const [course, setCourse] = React.useState<Course | null>(null);
  React.useEffect(() => {
    const fetch = async () => {
      const response = await studentGetCourse(courseId);
      setCourse(response.course);
    };

    fetch();
  }, [courseId]);
  
  const [socket, setSocket] = React.useState<Socket | null>(null);

  React.useEffect(() => {
    const newSocket = io(`http://localhost:8080`, {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.emit('enter-class', {
      courseId,
      device: 'web',
    });

    return () => {
      newSocket.close()
    };
  }, [setSocket]);

  return (
    <div className="container">
      <img src={attendClass} className="page-icon" alt="login icon"/>
      <div className="spacer-vertical" />
      <h1>{i18n("Thanks for joining")} {course?.name}</h1>
      <div className="row">
          <div className="col-sm">

          </div>
      </div>
  </div>
  )
};
