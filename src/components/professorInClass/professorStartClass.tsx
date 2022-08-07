import React from 'react';
import { RouteComponentProps, Prompt } from 'react-router-dom';
//axios
import { i18n } from 'web-translate';
import { v4 as uuid } from 'uuid';
import {getCourse, professorStopCourseSession, professorGetCurrentSession, professorStartCourseSession, professorUpdateCourseSession } from "../../store/axios";
import { Card } from '../Resusable/Card';
import { AllowedURLEditor } from '../Resusable/AllowedURLEditor';
import { GraphSeriesFilter } from '../Resusable/GraphSeriesFilter';
import { EngagementGraph } from './EngagementGraph';
import { EngagementData, CourseSession } from './types';
import { Loading } from './Loading';
import { useEngagementGraphToggles } from './hooks';
import { createEngagementPointsForCourseSession } from './utils';
import {LiveStudentTrackingTable} from './InClass/LiveStudentTrackingTable';
import { InClassOptions } from '../Resusable/InClassOptions';
import { Course, InClassFlagAction } from '../../types';

const editIcon = require('../../Assets/images/edit-icon.png');

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
        <div className="spacer-vertical" />
        {saving ? <p>Saving...</p> : <button type='button' onClick={handleClickSave} className="btn">{i18n("Save")}</button>}
    </>
  );
};

type Props = RouteComponentProps<{
    courseId: string;
}>

const POLLING_INTERVAL = 1000 * 2;

type InSessionInClassProps = {
    courseSession: CourseSession;
    stopSession(): void;
    courseId: string;
}

const InSessionInClass: React.FC<InSessionInClassProps> = ({ courseId, courseSession, stopSession }) => {
    const { onToggleGraphLine, selectedGraphLines } = useEngagementGraphToggles();

    const engagementPoints: EngagementData[] | undefined = React.useMemo(() => {
        if (courseSession) {
            return createEngagementPointsForCourseSession(courseSession);
        }
    }, [courseSession]);

    React.useEffect(() => {
        return () => {
            stopSession();
        };
    }, []);

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
                    <LiveStudentTrackingTable course={courseSession?.course} courseId={courseId} sessionId={courseSession?.id} students={courseSession?.students ?? []} studentCourseSessions={courseSession?.studentCourseSessions ?? []} />
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
            <Prompt
                when={true}
                message="Are you sure you want to leave? Exiting this page will end your class session."
            />
        </div>
    )
}

type SessionStartParams = {
    trackingDelay: number;
    attendanceThreshold: number;
    flagTriggers: InClassFlagAction[];
    urls: string[];
};

type StartInClassSessionProps = {
    course: Course;
    startSession(data: SessionStartParams): void;
};

const StartInClassSession: React.FC<StartInClassSessionProps> = ({ course, startSession }) => {
    const [trackingDelay, setTrackingDelay] = React.useState<string>(course?.defaultAttendanceTrackingDelay ? `${course?.defaultAttendanceTrackingDelay}` : '1');
    const [attendanceThreshold, setAttendanceThreshold] = React.useState<string>(course?.defaultAttendanceThreshold ? `${course?.defaultAttendanceThreshold}` : '99');
    const [flagTriggers, setFlagTriggers] = React.useState<InClassFlagAction[]>(course?.defaultAttendanceFlags ?? []);
    const [urls, setUrls] = React.useState<AllowedURLEntity[]>(course?.allowedUrls?.map(url => ({ id: uuid(), url })) ?? []);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(e => {
        e.preventDefault();

        startSession({
            trackingDelay: Number(trackingDelay),
            attendanceThreshold: Number(attendanceThreshold),
            flagTriggers,
            urls: urls.map(u => u.url),
        })
    }, [startSession, trackingDelay, attendanceThreshold, flagTriggers, urls]);

    return(
        <div className="container">
            <img src={editIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
            <h3 className='text-black'>Start InClass Session</h3>
            <div className="spacer-vertical" />
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-sm">
                        <InClassOptions
                            trackingDelay={trackingDelay}
                            setTrackingDelay={setTrackingDelay}
                            attendanceThreshold={attendanceThreshold}
                            setAttendanceThreshold={setAttendanceThreshold}
                            flagTriggers={flagTriggers}
                            setFlagTriggers={setFlagTriggers}
                        />
                    </div>
                </div>
                <div className="spacer-vertical" />
                <div className="row">
                    <div className="col-sm">
                        <AllowedURLEditor urls={urls} onChangeUrls={setUrls} />
                        <div className="spacer-vertical" />
                    </div>
                </div>
                <div className="spacer-vertical" />
                <div className="">
                    <input type="submit" className="btn" value={i18n("Begin InClass")} />
                </div>
            </form>
        </div>
    )
};

const ProfessorClassStart:  React.FC<Props> = ({ match, history }) => {
    const [loading, setLoading] = React.useState(true);
    const [course, setCourse] = React.useState<Course | null>();
    const [courseSession, setCourseSession] = React.useState<CourseSession | null>();
    const {courseId} = match.params;
    const [error, setError] = React.useState<string | undefined>();

    React.useEffect(() => {
        const fetch = async () => {
            try  {
                const course = await getCourse(courseId);
                setCourse(course);

                const courseSessionResponse = await professorGetCurrentSession(courseId);
                setCourseSession(courseSessionResponse.courseSession);

                setLoading(false);    
            } catch (err) {
                setError((err as Error).message);
            }
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

    const startSession = React.useCallback(async (data: SessionStartParams) => {
        try {
            setLoading(true);
            const newSession = await professorStartCourseSession(courseId, data);
            setCourseSession(newSession);
            setLoading(false);
        } catch (err) {
            setError(err as any);
        }
    }, [courseId, history]);

    const stopSession = React.useCallback(async () => {
        setLoading(true);
        await professorStopCourseSession(courseId);
        history.push('/professor/course');
    }, [courseId, history]);

    if (loading || error) {
        return <Loading />
    }

    if (courseSession) {
        return <InSessionInClass courseId={courseId} courseSession={courseSession} stopSession={stopSession} />
    }

    return (
        <StartInClassSession
            course={course!}
            startSession={startSession}
        />
    );
}

export default ProfessorClassStart;