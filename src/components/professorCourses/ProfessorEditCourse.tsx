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
import { InClassFlagAction } from '../../types';

const isValid = (accessCode: string) => {
  if (accessCode.length === 0) {
    return true;
  }

  return (new RegExp('^\\d{4}$', 'ig')).test(accessCode);
}

export const ProfessorEditCourse: React.FC<RouteComponentProps<{ courseId: string }>> = ({ history, match }) => {
  const {courseId} = match.params;
  const [displayName, setDisplayName] = React.useState('');
  const [classId, setClassId] = React.useState('');
  const [accessCode, setAccessCode] = React.useState('');
  const [integrationId, setIntegrationId] = React.useState<string | null>(null);

  const [allowedUrls, setAllowedUrls] = React.useState<AllowedURLEntity[]>([]);

  const [trackingDelay, setTrackingDelay] = React.useState<string>('1');
  const [attendanceThreshold, setAttendanceThreshold] = React.useState<string>('99');
  const [flagTriggers, setFlagTriggers] = React.useState<InClassFlagAction[]>([]);

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const isAccessCodeValid = React.useMemo(() => {
    return isValid(accessCode);
  }, [accessCode]);

  React.useEffect(() => {
    const fetch = async () => {
      const course = await getCourse(courseId);

      setDisplayName(course?.name);
      setClassId(course?.classId);
      setAllowedUrls(course?.allowedUrls?.map(url => ({ id: uuid(), url })) ?? []);
      setIntegrationId(course?.integrationId ?? "");
      setAccessCode(course?.accessCode ?? '');

      setTrackingDelay(course?.defaultAttendanceTrackingDelay ? `${course?.defaultAttendanceTrackingDelay}` : '1');
      setAttendanceThreshold(course?.defaultAttendanceThreshold ? `${course?.defaultAttendanceThreshold}` : '99');
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
        accessCode: isAccessCodeValid ? accessCode : undefined,
      });

      history.push(paths.professorCourseList({}));
    } catch (err) {
      setErrorMessage((err as Error).message);
    }

  }, [displayName, isAccessCodeValid, accessCode, integrationId, classId, allowedUrls, trackingDelay, attendanceThreshold, flagTriggers]);

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
                <InputRow
                  label={i18n("Access Code")}
                  value={accessCode}
                  onChange={setAccessCode}
                  maxLength={4}
                />
                {!isAccessCodeValid && <p>Please enter a valid 4 digit access code</p>}
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
