import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import {createCourse} from '../../store/axios';
import { paths } from '../../paths';
import { CourseForm, CourseFormSaveData } from './CourseForm';

export const ProfessorAddCourse: React.FC<RouteComponentProps<{}>> = ({ history }) => {
  const [_errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const saveCourse = React.useCallback(async (data: CourseFormSaveData) => {
    try {
      await createCourse(data);
      history.push(paths.professorCourseList({}));
    } catch (err) {
      setErrorMessage((err as Error).message);
    }

  }, []);

  return(
      <CourseForm
        course={null}
        saveCourse={saveCourse}
      />
  );
}
