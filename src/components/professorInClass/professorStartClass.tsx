import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
//axios
import { i18n } from 'web-translate';
import { v4 as uuid } from 'uuid';
import { professorStopCourseSession, professorGetCurrentSession, professorStartCourseSession, professorUpdateCourseSession } from "../../store/axios";
import { Card } from '../Resusable/Card';
import { AllowedURLEditor } from '../Resusable/AllowedURLEditor';
import { GraphSeriesFilter } from '../Resusable/GraphSeriesFilter';
import { IndicatorDot } from '../Resusable/IndicatorDot';
import { EngagementGraph } from './EngagementGraph';
import { paths } from '../../paths';
import { EngagementData, CourseSession, Student, StudentCourseSession } from './types';
import { Loading } from './Loading';
import { useEngagementGraphToggles } from './hooks';
import { transformIndividualStudentSessionsIntoPoints, ByDeviceAndStudentId, flattenAndTotalEngagmentData, findLatestDisconnectTime, clampDateToBucket } from './utils';

const editIcon = require('../../Assets/images/edit-icon.png');

type StudentTrackingTableProps = {
    courseId: string;
    sessionId?: string;
    students: Student[];
    studentCourseSessions: StudentCourseSession[];
}

const ActiveStatus: React.FC<{ studentSessions: StudentCourseSessions, device: string }> = ({ studentSessions, device }) => {
    const sessionsForDevice = studentSessions?.byDevice[device] ?? [];

    if (sessionsForDevice?.length) {
        if (sessionsForDevice[sessionsForDevice.length - 1].disconnectedTime) {
            return (
                <div>
                    <IndicatorDot color='red' />
                    Disconnected
                </div>
            );
        }

        return (
            <div>
                <IndicatorDot color='green' />
                Online
            </div>
        )
    }

    return (
        <div>
            <IndicatorDot color='gray' />
            Not entered
        </div>
    )
}

type StudentCourseSessions = {
    byDevice: {
        [device: string]: StudentCourseSession[];
    };
    flags: number;
};

type GroupedSessions = {
    [studentId: string]: StudentCourseSessions
}

const StudentTrackingTable: React.FC<StudentTrackingTableProps> = ({ courseId, sessionId, students, studentCourseSessions }) => {
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
            accum[session.student].flags += session.screenshotViolations?.length ?? 0;

            return accum;   
        }, {});
    }, [studentCourseSessions]);

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
  )
}

type AllowedURLEntity = {
    id: string;
    url: string;
}

type AllowedURLTableProps = {
    courseId: string;
    allowedUrls: string[];
}

const InClassAllowedURLTable: React.FC<AllowedURLTableProps> = ({ courseId, allowedUrls }) => {
    const [urls, setUrls] = React.useState<AllowedURLEntity[]>(allowedUrls.map(url => ({
        id: uuid(),
        url,
    })));


    const [saving, setSaving] = React.useState(false);
    const handleClickSave = React.useCallback(async () => {
        setSaving(true);
        try {
            await professorUpdateCourseSession(courseId, { allowedUrls: urls.map(u => u.url) });
            setSaving(false);
        } catch {
        }
    }, [courseId, urls]);

  return (
    <>
        <AllowedURLEditor urls={urls} onChangeUrls={setUrls} />
        {saving ? <p>Saving...</p> : <button type='button' onClick={handleClickSave} className="btn">{i18n("Save")}</button>}
    </>
  );
};

type Props = RouteComponentProps<{
    courseId: string;
}>

const POLLING_INTERVAL = 1000 * 2;

const ProfessorClassStart:  React.FC<Props> = ({ match, history }) => {
    const [loading, setLoading] = React.useState(true);
    const [courseSession, setCourseSession] = React.useState<CourseSession | null>();
    const {courseId} = match.params;

    React.useEffect(() => {
        const fetch = async () => {
            const {courseSession} = await professorGetCurrentSession(courseId);
            if (!courseSession) {
                const resp = await professorStartCourseSession(courseId);
                setCourseSession(resp);
                setLoading(false);
                return;
            }

            setCourseSession(courseSession);
            setLoading(false);
        };

        fetch();

        const startPolling = () => {
            return setTimeout(async () => {
                await fetch();
                timer = startPolling();
            }, POLLING_INTERVAL);
        };

        let timer = startPolling();

        return () => {
            clearTimeout(timer);
        }
    }, []);

    const stopSession = React.useCallback(async () => {
        setLoading(true);
        await professorStopCourseSession(courseId);
        history.push('/professor/course');
    }, [courseId, history]);

    const { onToggleGraphLine, selectedGraphLines } = useEngagementGraphToggles();

  const engagementPoints: EngagementData[] | undefined = React.useMemo(() => {
    if (courseSession) {
      if (courseSession.studentCourseSessions.length === 0) {
        return undefined;
      }

      const copy = [...courseSession.studentCourseSessions].map(x => ({ ...x, epoch: (new Date(x.connectedTime).getTime()) }));
      copy.sort((a, b) => {
        return a.epoch - b.epoch;
      });

      const lastSessionEnd = findLatestDisconnectTime(courseSession.studentCourseSessions)
      const firstStartSessionStart = clampDateToBucket(new Date(copy[0].connectedTime));
      const clampedLastSessionEnd = clampDateToBucket(lastSessionEnd ?? new Date());

      const courseSessionsByDeviceAndStudent = courseSession.studentCourseSessions.reduce((byDeviceAndStudent: ByDeviceAndStudentId, studentCourseSession) => {
        if (!byDeviceAndStudent[studentCourseSession.device]) {
          byDeviceAndStudent[studentCourseSession.device] = {};
        }

        if (!byDeviceAndStudent[studentCourseSession.device][studentCourseSession.student]) {
          byDeviceAndStudent[studentCourseSession.device][studentCourseSession.student] = [];
        }

        byDeviceAndStudent[studentCourseSession.device][studentCourseSession.student].push(studentCourseSession);

        return byDeviceAndStudent;
      }, {});

        // Devices are hard coded, could be dynamic
        const bucketedStatusesForWeb = Object.values(courseSessionsByDeviceAndStudent['web'] ?? {}).map(sessions => transformIndividualStudentSessionsIntoPoints(sessions, true, firstStartSessionStart, clampedLastSessionEnd));
        const bucketedStatusesForMobile = Object.values(courseSessionsByDeviceAndStudent['mobile'] ?? {}).map(sessions => transformIndividualStudentSessionsIntoPoints(sessions, false, firstStartSessionStart, clampedLastSessionEnd));
        const combinedStatuses = [...bucketedStatusesForWeb, ...bucketedStatusesForMobile];

        return flattenAndTotalEngagmentData(combinedStatuses)
    }
  }, [courseSession]);

    if (loading) {
        return <Loading />
    }

    return(
        <div className="container">
            <img src={editIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
            <h3 className='text-black'>InClass Session In Progress</h3>
            <div className="spacer-vertical" />
            <Card>
                <Card.Header>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h5>Student Engagement</h5>
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
            <div className="row">
                <div className="col-sm">
                    <StudentTrackingTable courseId={courseId} sessionId={courseSession?.id} students={courseSession?.students ?? []} studentCourseSessions={courseSession?.studentCourseSessions ?? []} />
                </div>
            </div>
            <div className="spacer-vertical" />
            <button type='button' onClick={stopSession} className="btn-red">{i18n("End Class")}</button>
            <div className="spacer-vertical" />
            <div className="row">
                <div className="col-sm">
                    {courseSession?.allowedUrls && <InClassAllowedURLTable courseId={courseId} allowedUrls={courseSession?.allowedUrls} />}
                </div>
            </div>
            <div className="spacer-vertical" />
        </div>
    )
}

export default ProfessorClassStart;