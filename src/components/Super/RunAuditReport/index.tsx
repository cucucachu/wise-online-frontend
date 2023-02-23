import React, { FC, useState } from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import attendanceIcon from '../../../Assets/images/attendance-icon.png';

import { superRunAuditReportForTests, superRunAuditReportForStudents, } from '../../../store/axios';
import {UserLoginData} from '../../../types';

import { i18n } from 'web-translate';
import { useAuth } from '../../../hooks';
import { Card } from '../../Resusable/Card';
import { format } from 'date-fns';

const formatUploadDate = (maybeDateStr: string | null) => {
  if (!maybeDateStr) return null;

  return format(new Date(maybeDateStr), "M/d/yyyy h:mmaaa");
}

type SuperDashboardProps = {
    onSuccessfulLogin(loginData: UserLoginData): void;
} & RouteComponentProps;

const SchoolTable: FC<any> = ({ schools }) => {
  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th>School ID</th>
          <th>School name</th>
          <th>Upload date</th>
          <th>Student count</th>
          <th>Test count</th>
        </tr>
      </thead>
      <tbody>
        {schools.map((s: any) => 
          <tr key={s.schoolId}>
            <td>{s.schoolId}</td>
            <td>{s.schoolName}</td>
            <td>{formatUploadDate(s.uploadDate)}</td>
            <td>{s.studentCount}</td>
            <td>{s.testCount}</td>
          </tr>  
        )}
      </tbody>
    </table>
  );
}

const RunAuditReport: FC<SuperDashboardProps> = (props) => {
  const [afterDate, setAfterDate] = useState('');
  const [schools, setSchools] = useState<any>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const onSubmit: React.FormEventHandler = async  (e) => {
    e.preventDefault();
    const afterDateParsed = new Date(afterDate);

    try {
      const results = await Promise.all([
        superRunAuditReportForTests(afterDateParsed), 
        superRunAuditReportForStudents(afterDateParsed)  
      ]);

      const testsBySchool = results[0].data.reduce((accum: any, s: any) => {
        accum[s.schoolId] = s;
        return accum;
      }, {});

      const schoolResultsById = results[1].data.reduce((accum: any, s: any) => {
        accum[s.schoolId] = s;
        return accum;
      }, {});
      
      const allIds = new Set([...Object.keys(schoolResultsById), ...Object.keys(testsBySchool)]);
      setSchools([...allIds].map(id => {
        const schoolStudentInfo = schoolResultsById[id];
        const schoolTestInfo = testsBySchool[id];

        return {
          "schoolId": schoolStudentInfo?.schoolId,
          "schoolName": schoolStudentInfo?.schoolName,
          "uploadDate": schoolStudentInfo?.uploadDate,
          "studentCount": schoolStudentInfo?.studentCount,
          "testCount": schoolTestInfo?.testCount,
        };
      }))
    } catch (err: any) {
      setError(err);
    }
  }

      return (
          <div className="container">
              <img src={ attendanceIcon } className="page-icon" alt="login icon"/>
              <div className="spacer-vertical-s"></div>
              <h1>{i18n("Super Dashboard")}</h1>
              <div className="spacer-vertical" />
              <Card>
                <Card.Body>
                  <form onSubmit={onSubmit}>
                    <div>Look up results after date:</div>
                    <input onChange={e => setAfterDate(e.target.value)} value={afterDate} type='date' />
                    <button className='btn' type='submit'>
                      Look up
                    </button>
                  </form>
                </Card.Body>
              </Card>
              <div className="spacer-vertical" />
              <Card>
                <Card.Body>
                  {error && <p>{error.message ?? error.toString()}</p>}
                  {schools && <SchoolTable schools={schools} />}
                </Card.Body>
              </Card>
              {/* <pre>{JSON.stringify(schools, null, 2)}</pre> */}
          </div>
      )
  }

export const SuperRunAuditReport = (props: RouteComponentProps) => {
    const auth = useAuth();
    return (
        <RunAuditReport
            {...props}
            onSuccessfulLogin={auth.onLogin}
        />
    )
};