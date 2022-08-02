import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import {getCourse, editCourse} from '../../store/axios';
import { paths } from '../../paths';
import { Course } from '../../types';
import { CourseForm, CourseFormSaveData } from './CourseForm';

export const ProfessorEditCourse: React.FC<RouteComponentProps<{ courseId: string }>> = ({ history, match }) => {
  const {courseId} = match.params;
  const [course, setCourse] = React.useState<Course | null>(null);

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetch = async () => {
      const course = await getCourse(courseId);
      setCourse(course);
    };

    fetch();
  }, [courseId]);

  const saveCourse = React.useCallback(async (data: CourseFormSaveData) => {
    try {
      await editCourse(courseId, {
        ...data,
      });

      history.push(paths.professorCourseList({}));
    } catch (err) {
      setErrorMessage((err as Error).message);
    }

  }, []);

  return(
      <CourseForm
        course={course}
        saveCourse={saveCourse}
      />
  );
}
