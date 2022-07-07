import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import loginIcon from '../../Assets/images/login-icon.png';
import { i18n } from 'web-translate';
import {getCourse, editCourse} from '../../store/axios';
import {Card} from '../Resusable/Card';
import {AllowedURLEditor, AllowedURLEntity} from '../Resusable/AllowedURLEditor';
import {InputRow} from '../Resusable/InputRow';
import {InClassOptions} from '../Resusable/InClassOptions';
import { v4 as uuid } from 'uuid';
import { paths } from '../../paths';

export const ProfessorEditCourse: React.FC<RouteComponentProps<{ courseId: string }>> = ({ history, match }) => {
  const {courseId} = match.params;
  const [displayName, setDisplayName] = React.useState('');
  const [classId, setClassId] = React.useState('');
  const [integrationId, setIntegrationId] = React.useState<string | null>(null);

  const [allowedUrls, setAllowedUrls] = React.useState<AllowedURLEntity[]>([]);

  const [trackingDelay, setTrackingDelay] = React.useState<string>('');
  const [attendanceThreshold, setAttendanceThreshold] = React.useState<string>('');
  const [flagTriggers, setFlagTriggers] = React.useState<string[]>([]);

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetch = async () => {
      const course = await getCourse(courseId);
      debugger;
      setDisplayName(course?.name);
      setClassId(course?.classId);
      setAllowedUrls(course?.allowedUrls?.map(url => ({ id: uuid(), url })) ?? []);
      setIntegrationId(course?.integrationId);

      setTrackingDelay(course?.defaultAttendanceTrackingDelay ? `${course?.defaultAttendanceTrackingDelay}` : '');
      setAttendanceThreshold(course?.defaultAttendanceThreshold ? `${course?.defaultAttendanceThreshold}` : '');
      setFlagTriggers(course?.defaultAttendanceFlags ?? []);
    };

    fetch();
  }, [courseId]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(async (e) => {
    e.preventDefault();

    try {
      await editCourse(courseId, {
        name: displayName,
        integrationId,
        classId,
        allowedUrls: allowedUrls?.map(u => u.url),
        defaultAttendanceTrackingDelay: trackingDelay ? Number(trackingDelay) : undefined,
        defaultAttendanceThreshold: attendanceThreshold ? Number(attendanceThreshold) : undefined,
        defaultAttendanceFlags: flagTriggers,
      });

      history.push(paths.professorCourseList({}));
    } catch (err) {
      setErrorMessage((err as Error).message);
    }

  }, [displayName, integrationId, classId, allowedUrls, trackingDelay, attendanceThreshold, flagTriggers]);

  return(
      <div className="container">
          <img src={loginIcon} className="page-icon" alt="login icon"/>
          <div className="spacer-vertical"/>
          <h1>{i18n("Course Settings")}</h1>
          <div className="spacer-vertical"/>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={onSubmit}>
            <Card>
              <Card.Body>
                <InputRow
                  label={i18n("Display Name")}
                  value={displayName}
                  onChange={setDisplayName}
                />
                <InputRow
                  label={i18n("ClassID")}
                  value={classId}
                  onChange={setClassId}
                />
              </Card.Body>
          </Card>
          <div className="spacer-vertical"/>
          <InClassOptions
            trackingDelay={trackingDelay}
            setTrackingDelay={setTrackingDelay}
            attendanceThreshold={attendanceThreshold}
            setAttendanceThreshold={setAttendanceThreshold}
            flagTriggers={flagTriggers}
            setFlagTriggers={setFlagTriggers}
          />
          <div className="spacer-vertical"/>
          <AllowedURLEditor urls={allowedUrls} onChangeUrls={setAllowedUrls} />
          <div className="spacer-vertical"/>
            <div className="">
                <input type="submit" className="btn" value={i18n("Save Class Settings")} />
            </div>
          </form>
      </div>
  );
}
