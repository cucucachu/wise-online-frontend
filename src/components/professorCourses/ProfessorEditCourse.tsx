import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import {getCourse, editCourse, deleteCourse} from '../../store/axios';
import { paths } from '../../paths';
import { Course } from '../../types';
import { DangerUnderlineButton } from '../Resusable/DangerUnderlineButton';
import { Modal } from '../Resusable/Modal';
import { CourseForm, CourseFormSaveData } from './CourseForm';
import loginIcon from '../../Assets/images/login-icon.png';
import { i18n } from 'web-translate';

export const ProfessorEditCourse: React.FC<RouteComponentProps<{ courseId: string }>> = ({ history, match }) => {
  const {courseId} = match.params;
  const [loading, setLoading] = React.useState(false);
  const [course, setCourse] = React.useState<Course | null>(null);

  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

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

  const onClickDelete = React.useCallback(() => {
    setShowDeleteModal(true);
  }, [setShowDeleteModal]);

  const onClickCancelDelete = React.useCallback(() => {
    setShowDeleteModal(false);
  }, [setShowDeleteModal]);

  const onClickConfirmDelete = React.useCallback(async () => {
    setShowDeleteModal(false);
    setLoading(true);
    await deleteCourse(courseId);
    history.goBack();
  }, [setShowDeleteModal, courseId]);

  if (loading) {
    return (
      <div className="container">
        <img src={loginIcon} className="page-icon" alt="login icon"/>
        <div className="spacer-vertical"/>
        <h1>{i18n("Course Settings")}</h1>
        <div className="spacer-vertical"/>
        <p>Loading...</p>
      </div>
    )
  }

  return(
    <div className="container">
      <img src={loginIcon} className="page-icon" alt="login icon"/>
      <div className="spacer-vertical"/>
      <h1>{i18n("Course Settings")}</h1>
      <div className="spacer-vertical"/>
        <CourseForm
          course={course}
          saveCourse={saveCourse}
          errorMessage={errorMessage}
        />
        <DangerUnderlineButton className='mt-5' onClick={onClickDelete}>
          Delete Course
        </DangerUnderlineButton>
        <Modal open={showDeleteModal}>
          <Modal.Content>
            <Modal.Title className='text-danger'>Caution!</Modal.Title>
            <Modal.Title>Are you sure you want to delete the course?</Modal.Title>
            <div className='mt-5'>
            <button onClick={onClickConfirmDelete} style={{ width: '60%' }} type='button' className="btn-red">{i18n("Yes, delete course")}</button>
            </div>
            <div className='mt-3 mb-3'>
              <button onClick={onClickCancelDelete} style={{ width: '60%' }} type='button' className="btn">{i18n("No, do not delete")}</button>
            </div>
          </Modal.Content>
        </Modal>
    </div>
  );
}
