import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { format } from 'date-fns';
import {professorGetCourseSessionDetailForStudent, professorGetCourseSessionDetailScreenshot} from '../../store/axios';
import { CourseSession, Student, EngagementData } from './types';
import { Loading } from './Loading';
import { EngagementGraph } from './EngagementGraph';
import { Card } from '../Resusable/Card';
import {GraphSeriesFilter} from '../Resusable/GraphSeriesFilter';
import { useEngagementGraphToggles } from './hooks';
import {createEngagementPointsForCourseSession} from './utils';
import {IndividualStudentGroupedFlagTable} from './InClass/IndividualStudentGroupedFlagTable';
import './ProfessorInClassViewStudent.css';
import {ScreenshotViewer} from '../Resusable/ScreenshotViewer';

const editIcon = require('../../Assets/images/edit-icon.png');

type ProfessorInClassViewStudentProps = RouteComponentProps<{
  courseId: string;
  sessionId: string;
  studentId: string;
}>

type FlaggedScreenShot = {
  screenshotId: string;
  screenshotUrl: string;
  unknownDomains: string[];
  timestamp: Date;
}

export const ProfessorInClassViewStudent: React.FC<ProfessorInClassViewStudentProps> = ({ match }) => {
  const [loading, setLoading] = React.useState(true);
  const [courseSession, setCourseSession] = React.useState<CourseSession | null>();
  const [student, setStudent] = React.useState<Student | null>(null);
  const {courseId, sessionId, studentId} = match.params;

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const response = await professorGetCourseSessionDetailForStudent(courseId, sessionId, studentId);
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

  const screenshotUrls: FlaggedScreenShot[] = React.useMemo(() => {
    if (courseSession) {
      return courseSession.studentCourseSessions.reduce((accum, s) => {
        if (!s.screenshotDetails) {
          return accum;
        }
        console.log(s.screenshotDetails)
        return accum.concat(s.screenshotDetails.filter(detail => {
          return !!(detail.unknownDomains?.length);
        }).map(detail => {
          return {
            screenshotId: detail._id,
            screenshotUrl: professorGetCourseSessionDetailScreenshot(detail._id),
            unknownDomains: detail.unknownDomains,
            timestamp: new Date(detail.timestamp),
          }
        }));
      }, [] as FlaggedScreenShot[]);
    }

    return [];
  }, [courseSession]);

  const [currentScreenShotIndex, setCurrentScreenShotIndex] = React.useState(0);
  const onClickNextIssue = React.useCallback(() => {
    setCurrentScreenShotIndex(currentScreenShotIndex + 1);
  }, [currentScreenShotIndex, setCurrentScreenShotIndex]);

  const playTimerHandle = React.useRef<any | null>(null);
  const onClickPlay = React.useCallback(() => {
    if (!playTimerHandle.current) {
      playTimerHandle.current = setInterval(() => {
        setCurrentScreenShotIndex((value) => {
          if (value < screenshotUrls.length - 1) {
            return value + 1;
          } else {
            return 0;
          }
        });
      }, 750);
    }
  }, [setCurrentScreenShotIndex, screenshotUrls]);

  const onClickPause = React.useCallback(() => {
    if (playTimerHandle.current) {
      clearInterval(playTimerHandle.current);
      playTimerHandle.current = null;
    }
  }, []);

  const onClickInterval = React.useCallback((screenshotId: string) => {
    const index = screenshotUrls.findIndex((value) => value.screenshotId === screenshotId);
    if (index !== -1) {
      setCurrentScreenShotIndex(index);
    }
  }, [screenshotUrls]);

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
                      label='Disconnects'
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
    <div className="spacer-vertical" />
    <Card>
      <Card.Body>
        <h2 className='text-black'>Flag Screen Capture</h2>
        <ScreenshotViewer.Container>
          <ScreenshotViewer.ImageContainer>
            {screenshotUrls[currentScreenShotIndex] && <img style={{ height: '100%', marginBottom: 20 }} src={screenshotUrls[currentScreenShotIndex].screenshotUrl} />}
          </ScreenshotViewer.ImageContainer>
          <ScreenshotViewer.Slider max={screenshotUrls.length - 1} value={currentScreenShotIndex} onChange={setCurrentScreenShotIndex} />
          <ScreenshotViewer.PlayControls
              onClickPlay={onClickPlay}
              onClickNextIssue={onClickNextIssue}
              onClickPause={onClickPause}
              hasNext={currentScreenShotIndex < screenshotUrls.length - 1}
              infoText={`Frame ${currentScreenShotIndex + 1} / ${screenshotUrls.length} @ ${screenshotUrls[currentScreenShotIndex] && format(screenshotUrls[currentScreenShotIndex].timestamp, 'M/d/yy - h:mm:ss aaa')}`}
          />
        </ScreenshotViewer.Container>
        <IndividualStudentGroupedFlagTable
          courseSession={courseSession!}
          onClickInterval={onClickInterval}
        />
      </Card.Body>
    </Card>
    </div>
  );
};
