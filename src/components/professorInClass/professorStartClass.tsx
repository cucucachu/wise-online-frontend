import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
//axios
import { i18n } from 'web-translate';
import { v4 as uuid } from 'uuid';
import { professorStopCourseSession, professorGetCurrentSession, professorStartCourseSession, professorUpdateCourseSession } from "../../store/axios";
import recordingIcon from "../../Assets/images/recording-icon.png";

const editIcon = require('../../Assets/images/edit-icon.png');

type CourseSessionStudent = {
    student: {
        studentId: string;
        firstName: string;
        lastName: string;
    },
    devices: string;
}

type StudentTrackingTableProps = {
    students: CourseSessionStudent[];
}

const ActiveStatus: React.FC<{ studentSession: CourseSessionStudent, device: string }> = ({ studentSession, device }) => {
    if (studentSession.devices.includes(device)) {
        return (
            <span>Online <img width="20px" src={recordingIcon} /></span>
        )
    }

    return <em>Offline</em>;
}

const StudentTrackingTable: React.FC<StudentTrackingTableProps> = ({ students }) => {
  return (
    <div className="shadow">
      <table className="table table-striped">
          <thead>
              <tr>
                  <th>Student</th>
                  <th>Desktop Status</th>
                  <th>Phone Status</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
            {students.map((studentSession) => 
                <tr key={studentSession.student.studentId}> 
                  <td>
                    {studentSession.student.firstName} {studentSession.student.lastName}
                  </td>
                  <td>
                    <ActiveStatus studentSession={studentSession} device='web' />
                  </td>
                  <td>
                    <ActiveStatus studentSession={studentSession} device='mobile' />
                  </td>
                  <td></td>
              </tr>)}
          </tbody>
      </table>
  </div>
  )
}

type AllowedURLEntity = {
    id: string;
    url: string;
}

type AllowedURLRowProps = {
    urlEntity: AllowedURLEntity;
    onChange(urlEntity: AllowedURLEntity): void;
    onRemove(urlEntity: AllowedURLEntity): void;
}

const AllowedURLRow: React.FC<AllowedURLRowProps> = ({ urlEntity, onChange, onRemove }) => {
    const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        onChange({
            ...urlEntity,
            url: e.currentTarget.value,
        });

    }, [onChange, urlEntity]);

    const handleClickRemove = React.useCallback(() => {
        onRemove(urlEntity);
    }, [urlEntity, onRemove]);

    return (
        <tr>
            <td>
              <input
                type="text"
                placeholder="https://google.com"
                onChange={onChangeInput}
                value={urlEntity.url}
                />
           </td>
           <td>
                <a onClick={handleClickRemove}>Remove</a>
           </td>
        </tr>
    );
};

type AllowedURLTableProps = {
    courseId: string;
    allowedUrls: string[];
}

const AllowedURLTable: React.FC<AllowedURLTableProps> = ({ courseId, allowedUrls }) => {
    const [urls, setUrls] = React.useState<AllowedURLEntity[]>(allowedUrls.map(url => ({
        id: uuid(),
        url,
    })));

    const onChangeUrl = React.useCallback((urlToUpdate: AllowedURLEntity) => {
        setUrls(urls.map(url => {
            if (urlToUpdate.id === url.id) {
                return urlToUpdate;
            }

            return url;
        }));
    }, [setUrls, urls]);

    const onRemoveUrl = React.useCallback((urlToRemove: AllowedURLEntity) => {
        setUrls(urls.filter(url => {
            return url.id !== urlToRemove.id;
        }));
    }, [setUrls, urls]);

    const handleClickAdd = React.useCallback(() => {
        setUrls(urls.concat([
            {
                id: uuid(),
                url: '',
            }
        ]))
    }, [urls, setUrls]);

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
    <div className="shadow">
      <h4>Allowed Website URLs for Students</h4>
      <table className="table table-striped">
          <thead>
              <tr>
                  <th>URL</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
            {urls.map(url => <AllowedURLRow key={url.id} urlEntity={url} onChange={onChangeUrl} onRemove={onRemoveUrl} />)}
          </tbody>
      </table>
      <p><a onClick={handleClickAdd}>Add</a></p>
    {saving ? <p>Saving...</p> : <button type='button' onClick={handleClickSave} className="btn">{i18n("Save")}</button>}
  </div>
  );
};

type Props = RouteComponentProps<{
    courseId: string;
}>

type CourseSession = {
    id: string;
    classId: string;
    keyCode: string;
    allowedUrls: string[];
    students: CourseSessionStudent[];
}

const POLLING_INTERVAL = 1000 * 30;

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
            <p>Share this code to allow students to join:</p>
            <h2 className="bold">{courseSession?.keyCode}</h2>
            <div className="spacer-vertical" />
            <button type='button' onClick={stopSession} className="btn">{i18n("Stop Class")}</button>
            <div className="row">
                <div className="col-sm">
                    <StudentTrackingTable students={courseSession?.students ?? []} />
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    {courseSession?.allowedUrls && <AllowedURLTable courseId={courseId} allowedUrls={courseSession?.allowedUrls} />}
                </div>
            </div>
        </div>
    )
}

export default ProfessorClassStart;