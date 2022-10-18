import * as React from 'react';
import setUpIcon from '../../../Assets/images/setting-icon.png';
import uploadIcon from '../../../Assets/images/upload-icon.svg';
import downloadIcon from '../../../Assets/images/download-icon.svg';
import Excel from 'exceljs';
// import '../Assets/css/radiobtn.css'
// import '../Assets/css/spinner.css'
import { adminBulkDeleteProfessors } from '../../../store/axios'

import { i18n } from 'web-translate';
import { RouteComponentProps } from 'react-router-dom';
import { IAuthContext } from '../../../contexts/AuthContext';
import { LoadingBlock } from '../../Resusable/LoadingBlock';
import { useAuth } from '../../../hooks';
import { Card } from '../../Resusable/Card';

type AdminBulkDeleteProfessorsProps = RouteComponentProps & IAuthContext;

const readBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
  
    reader.onload = function() {
      resolve(reader.result as ArrayBuffer);
    };
  
    reader.onerror = function() {
      reject(reader.error);
    };
  })
}

type ProfessorConfirmationRow = {
  email: string;
  firstName?: string;
  lastName?: string;
  courseCount?: number;
}

const AdminBulkDeleteProfessorsPreviewRow: React.FC<{ professor: ProfessorConfirmationRow }> = ({ professor }) => {
  if (professor.firstName) {
    return (
      <tr>
        <td>{professor.email}</td>
        <td>{professor.firstName}</td>
        <td>{professor.lastName}</td>
        <td>{professor.courseCount}</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>
          {professor.email}
        </td>
        <td colSpan={3}>
          <span className='text-red text-danger'>PROFESSOR NOT FOUND</span>
        </td>
      </tr>
    )
  }
};

export const AdminBulkDeleteProfessors: React.FC<AdminBulkDeleteProfessorsProps> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [deletedProfessorCount, setDeletedProfessorCount] = React.useState<number | null>(null);
  const [emails, setEmails] = React.useState<string[] | null>(null);
  const [confirmationCheckData, setConfirmationCheckData] = React.useState<ProfessorConfirmationRow[] | null>(null);

  const handleFileStudent: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(async (e) => {
    setLoading(true);
    const file = e.currentTarget.files![0];
    const buffer = await readBuffer(file);
    console.log(buffer);
    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.worksheets[0];
    const col = worksheet.getColumn(4);
    const parsedEmails = col.values.slice(2).map(v => v?.toString()).filter((x: string | undefined): x is string => !!x);
    setEmails(parsedEmails);
    const preDeleteResult = await adminBulkDeleteProfessors(parsedEmails, false);
    const preDeleteResultByEmail = preDeleteResult.data.professorsToDelete.reduce((accum: any, row: any) => {
      accum[row.email.toLowerCase()] = row;
      return accum;
    }, {});

    setConfirmationCheckData(parsedEmails.map((email: string): ProfessorConfirmationRow => {
      const savedProfessor = preDeleteResultByEmail[email];
      if (savedProfessor) {
        return {
          email,
          firstName: savedProfessor.firstName,
          lastName: savedProfessor.lastName,
          courseCount: savedProfessor.courses?.length ?? 0,
        }
      } else {
        return {
          email,
        }
      }
    }).sort((a, b) => {
      if (a.firstName && b.firstName) {
        return a.firstName.localeCompare(b.firstName);
      }

      if (a.firstName) {
        return -1;
      }

      return 1;
    }));
    setLoading(false);
  }, [setEmails]);

  const confirmDelete = React.useCallback(async () => {
    setLoading(true)
    const response = await adminBulkDeleteProfessors(emails!, true);
    setDeletedProfessorCount(response.data.deletedProfessors.length);
  }, [emails]);

  if (deletedProfessorCount) {
    return (
      <div className="wrap">
          <div className="page-header"></div>
          <div className="container">
              <img src={setUpIcon} className="page-icon" alt="login icon"/>
              <div className="spacer-vertical" />
              <h1>{i18n("Bulk Delete Professors")}</h1>
              <p>Successfully deleted {deletedProfessorCount} professors.</p>
          </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="wrap">
          <div className="page-header"></div>
          <div className="container">
              <img src={setUpIcon} className="page-icon" alt="login icon"/>
              <div className="spacer-vertical" />
              <h1>{i18n("Bulk Delete Professors")}</h1>
              <LoadingBlock />
          </div>
      </div>
    )
  }

  return(
      <div className="wrap">
          <div className="page-header"></div>
          <div className="container">
              <img src={setUpIcon} className="page-icon" alt="login icon"/>
              <div className="spacer-vertical" />
              <h1>{i18n("Bulk Delete Professors")}</h1>
              <div className="spacer-vertical-s"></div>

            <div className="container">
                  <div className="row align-1">
                      <div className="col-sm-6">
                          <div className="shadow">
                              <input type="file" id="fileupload2" onChange={handleFileStudent}/>
                              <label className="btn-upload" htmlFor="fileupload2"><img src={uploadIcon} className="icon-sm" alt="upload icon"/>&nbsp;{i18n("Upload Professor List")}
                              </label>

                              <div className="spacer-vertical-s"></div>
                              
                              <button className="btn-download"><img src={downloadIcon} className="icon-sm" alt="download icon"/>&nbsp;{i18n("Download template")}</button>  
                              
                          </div>
                      </div>                            
                  </div>
                  <div className="spacer-vertical" />
                  {confirmationCheckData && <Card>
                    <Card.Body>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Professor Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Courses</th>
                          </tr>
                        </thead>
                        <tbody>
                          {confirmationCheckData.map(professor => 
                            <AdminBulkDeleteProfessorsPreviewRow professor={professor} key={professor.email} />
                          )}
                        </tbody>
                      </table>
                      <div className="spacer-vertical" />
                      <div className='text-center'>
                        <button onClick={confirmDelete} className="btn-red">{i18n("Confirm Delete")}</button>
                        <p className='text-danger mt-3'>PLEASE REVIEW THE TABLE BEFORE DELETING. THIS CANNOT BE UNDONE.</p>
                      </div>
                    </Card.Body>
                  </Card>}
              </div>
          </div>
      </div>
  )
}
