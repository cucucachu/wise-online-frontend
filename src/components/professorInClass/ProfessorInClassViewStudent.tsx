import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { format } from 'date-fns';
import {professorGetCourseSessionDetailForStudent} from '../../store/axios';
import { CourseSession, Student } from './types';
import { Loading } from './Loading';
import { EngagementGraph } from './EngagementGraph';
import { Card } from '../Resusable/Card';
import {GraphSeriesFilter} from '../Resusable/GraphSeriesFilter';
import {OutlineButton} from '../Resusable/OutlineButton';
import { useEngagementGraphToggles } from './hooks';

const editIcon = require('../../Assets/images/edit-icon.png');

type ProfessorInClassViewStudentProps = RouteComponentProps<{
  courseId: string;
  sessionId: string;
  studentId: string;
}>

export const ProfessorInClassViewStudent: React.FC<ProfessorInClassViewStudentProps> = ({ match }) => {
  const [loading, setLoading] = React.useState(true);
  const [courseSession, setCourseSession] = React.useState<(CourseSession & { student: Student }) | null>();
  const {courseId, sessionId, studentId} = match.params;

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const response = await professorGetCourseSessionDetailForStudent(courseId, sessionId, studentId);
        setCourseSession(response.courseSession);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);

  const { onToggleGraphLine, selectedGraphLines } = useEngagementGraphToggles();

  if (loading || !courseSession) {
    return <Loading />;
  }
 
  const sessionDate = format(new Date(courseSession.startTime), 'MMMM do');

  return (
    <div className="container">
      <img src={editIcon} className="page-icon" alt="login icon"/>
      <div className="spacer-vertical" />
      <h3 className='text-black'>{courseSession.student?.firstName} {courseSession.student?.lastName} - {courseSession.course?.classId} - {sessionDate}</h3>
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
                  <h5>{courseSession.student?.firstName}'s Engagement</h5>
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
            <EngagementGraph />
        </Card.Body>
    </Card>
    <div className="spacer-vertical" />
    <Card>
      <Card.Body>
        <h2 className='text-black'>Flag Report</h2>

      </Card.Body>
    </Card>
    </div>
  );
};
// professorGetCourseSessionDetailForStudent
