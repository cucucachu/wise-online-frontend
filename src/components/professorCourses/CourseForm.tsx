import * as React from 'react';
import { i18n } from 'web-translate';
import {Card} from '../Resusable/Card';
import {AllowedURLEditor, AllowedURLEntity} from '../Resusable/AllowedURLEditor';
import {InputRow} from '../Resusable/InputRow';
import {InClassOptions} from '../Resusable/InClassOptions';
import { v4 as uuid } from 'uuid';
import { InClassFlagAction, Course } from '../../types';

const isValid = (accessCode: string) => {
  if (accessCode.length === 0) {
    return true;
  }

  return (new RegExp('^\\d{4}$', 'ig')).test(accessCode);
}

export type CourseFormSaveData = {
  name: string;
  integrationId: string | null;
  classId: string
  allowedUrls: string[];
  defaultAttendanceTrackingDelay: number | undefined;
  defaultAttendanceThreshold: number | undefined;
  defaultAttendanceFlags: InClassFlagAction[];
  accessCode: string | undefined;
};

type CourseFormProps = {
  course: Course | null;
  saveCourse(data: CourseFormSaveData): void;
  errorMessage?: string;
}

export const CourseForm: React.FC<CourseFormProps> = ({ errorMessage, course, saveCourse }) => {
  const [displayName, setDisplayName] = React.useState('');
  const [classId, setClassId] = React.useState('');
  const [accessCode, setAccessCode] = React.useState('');
  const [integrationId, setIntegrationId] = React.useState<string | null>(null);

  const [allowedUrls, setAllowedUrls] = React.useState<AllowedURLEntity[]>([]);

  const [trackingDelay, setTrackingDelay] = React.useState<string>('1');
  const [attendanceThreshold, setAttendanceThreshold] = React.useState<string>('99');
  const [flagTriggers, setFlagTriggers] = React.useState<InClassFlagAction[]>([]);

  React.useEffect(() => {
    setDisplayName(course?.name ?? '');
    setClassId(course?.classId ?? '');
    setAllowedUrls(course?.allowedUrls?.map(url => ({ id: uuid(), url })) ?? []);
    setIntegrationId(course?.integrationId ?? "");
    setAccessCode(course?.accessCode ?? '');

    setTrackingDelay(course?.defaultAttendanceTrackingDelay ? `${course?.defaultAttendanceTrackingDelay}` : '1');
    setAttendanceThreshold(course?.defaultAttendanceThreshold ? `${course?.defaultAttendanceThreshold}` : '99');
    setFlagTriggers(course?.defaultAttendanceFlags ?? []);
  }, [course]);

  const isAccessCodeValid = React.useMemo(() => {
    return isValid(accessCode);
  }, [accessCode]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(async (e) => {
    e.preventDefault();
  
    saveCourse({
        name: displayName,
        integrationId,
        classId,
        allowedUrls: allowedUrls?.map(u => u.url),
        defaultAttendanceTrackingDelay: trackingDelay ? Number(trackingDelay) : undefined,
        defaultAttendanceThreshold: attendanceThreshold ? Number(attendanceThreshold) : undefined,
        defaultAttendanceFlags: flagTriggers,
        accessCode: isAccessCodeValid ? accessCode : undefined,
      });
  }, [displayName, isAccessCodeValid, accessCode, integrationId, classId, allowedUrls, trackingDelay, attendanceThreshold, flagTriggers]);

  return(
      <>
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
      </>
  );
}
