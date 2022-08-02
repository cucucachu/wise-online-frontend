import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { format } from 'date-fns';
import {professorGetCourseSessionDetailForStudent} from '../../store/axios';
import { CourseSession, Student, EngagementData } from './types';
import { Loading } from './Loading';
import { EngagementGraph } from './EngagementGraph';
import { Card } from '../Resusable/Card';
import {GraphSeriesFilter} from '../Resusable/GraphSeriesFilter';
import {OutlineButton} from '../Resusable/OutlineButton';
import { useEngagementGraphToggles } from './hooks';
import {createEngagementPointsForCourseSession} from './utils';
import './ProfessorInClassViewStudent.css';

const editIcon = require('../../Assets/images/edit-icon.png');

type ProfessorInClassViewStudentProps = RouteComponentProps<{
  courseId: string;
  sessionId: string;
  studentId: string;
}>

export const ProfessorInClassViewStudent: React.FC<ProfessorInClassViewStudentProps> = ({ match }) => {
  const [loading, setLoading] = React.useState(true);
  const [courseSession, setCourseSession] = React.useState<CourseSession | null>();
  const [student, setStudent] = React.useState<Student | null>(null);
  const {courseId, sessionId, studentId} = match.params;

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const response = await professorGetCourseSessionDetailForStudent(courseId, sessionId, studentId);
        console.log(response.courseSession)
        setCourseSession(response.courseSession);
        setStudent(response.student);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);

  const { onToggleGraphLine, selectedGraphLines } = useEngagementGraphToggles();


  const engagementPoints: EngagementData[] | undefined = React.useMemo(() => {
    if (courseSession) {
        return createEngagementPointsForCourseSession(courseSession);
    }
  }, [courseSession]);

  const phoneDisconnected = React.useMemo(() => {
    if (courseSession) {
      const courseEnd = courseSession.endTime && new Date(courseSession.endTime);

      return !!courseSession.studentCourseSessions.filter(s => s.device === 'mobile').find(s => {
        if (!s.disconnectedTime) {
          return false;
        }

        const studentDisconnectTime = new Date(s.disconnectedTime);
        return courseEnd && courseEnd.getTime() > studentDisconnectTime.getTime();
      })
    }
  }, [courseSession]);

  const webDisconnected = React.useMemo(() => {
    if (courseSession) {
      const courseEnd = courseSession.endTime && new Date(courseSession.endTime);

      return !!courseSession.studentCourseSessions.filter(s => s.device === 'web').find(s => {
        if (!s.disconnectedTime) {
          return false;
        }

        const studentDisconnectTime = new Date(s.disconnectedTime);
        return courseEnd && courseEnd.getTime() > studentDisconnectTime.getTime();
      })
    }
  }, [courseSession]);

  const domainViolations = React.useMemo(() => {
    if (courseSession) {

      return courseSession.studentCourseSessions.reduce((accum, s) => {
        if (!s.screenshotViolations) {
          return accum;
        }

        return accum.concat(s.screenshotViolations);
      }, [] as string[]);
    }

    return [];
  }, [courseSession]);

  if (loading || !courseSession) {
    return <Loading />;
  }
 
  const sessionDate = format(new Date(courseSession.startTime), 'MMMM do');

  return (
    <div className="container">
      <img src={editIcon} className="page-icon" alt="login icon"/>
      <div className="spacer-vertical" />
      <h3 className='text-black'>{student?.firstName} {student?.lastName} - {courseSession.course?.classId} - {sessionDate}</h3>
      <div className="spacer-vertical" />
      <Card>
        <Card.Body className='text-black'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4>Attendance?: Yes</h4>
            <OutlineButton>
              Download all attendance
            </OutlineButton>
          </div>
        </Card.Body>
      </Card>
      <Card>
      <div className="spacer-vertical" />
      <Card.Header>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                  <h5>{student?.firstName}'s Engagement</h5>
                  <p>Click to toggle chart filters</p>
              </div>
              <div style={{ maxWidth: '600px' }}>
                  <GraphSeriesFilter
                      selected={selectedGraphLines.includes('mobile')}
                      color='blue'
                      label='Mobiles connected'
                      onToggle={(value) => onToggleGraphLine('mobile', value)}
                  />
                  <GraphSeriesFilter
                      selected={selectedGraphLines.includes('connected')}
                      color='green'
                      label='Computers connected'
                      onToggle={(value) => onToggleGraphLine('connected', value)}
                  />
                  <GraphSeriesFilter
                      selected={selectedGraphLines.includes('disconnects')}
                      color='red'
                      label='Disconnects/Flags'
                      onToggle={(value) => onToggleGraphLine('disconnects', value)}
                  />
              </div>
          </div>
        </Card.Header>
        <Card.Body>
          <EngagementGraph data={engagementPoints} selectedSeries={selectedGraphLines} />
        </Card.Body>
    </Card>
    <div className="spacer-vertical" />
    <Card>
      <Card.Body>
        <h2 className='text-black'>Flag Report</h2>
        <div className='in-class-flag-report-row'>
          <div className='in-class-flag-report-label'>Sites visited:</div>
          <div className='in-class-flag-report-value'>{domainViolations.length ? domainViolations.join(', ') : 'No flagged sites'}</div>
        </div>
        <div className='in-class-flag-report-row'>
          <div className='in-class-flag-report-label'>Phone Disconnected:</div>
          <div className='in-class-flag-report-value'>{phoneDisconnected ? 'yes' : 'no'}</div>
        </div>
        <div className='in-class-flag-report-row'>
          <div className='in-class-flag-report-label'>Computer Disconnected:</div>
          <div className='in-class-flag-report-value'>{webDisconnected ? 'yes' : 'no'}</div>
        </div>
      </Card.Body>
    </Card>
    </div>
  );
};
