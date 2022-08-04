import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import {createCourse} from '../../store/axios';
import { paths } from '../../paths';
import { CourseForm, CourseFormSaveData } from './CourseForm';
import loginIcon from '../../Assets/images/login-icon.png';
import { i18n } from 'web-translate';
export const ProfessorAddCourse: React.FC<RouteComponentProps<{}>> = ({ history }) => {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  const saveCourse = React.useCallback(async (data: CourseFormSaveData) => {
    try {
      await createCourse(data);
      history.push(paths.professorCourseList({}));
    } catch (err) {
      setErrorMessage((err as Error).message);
    }

  }, []);

  return(
    <div className="container">
      <img src={loginIcon} className="page-icon" alt="login icon"/>
      <div className="spacer-vertical"/>
      <h1>{i18n("Add Course")}</h1>
      <div className="spacer-vertical"/>
        <CourseForm
          course={null}
          saveCourse={saveCourse}
          errorMessage={errorMessage}
        />
    </div>
  );
}
