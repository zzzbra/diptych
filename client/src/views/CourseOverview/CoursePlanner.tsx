import classNames from 'classnames';
import React, { useState } from 'react';
import { useParams } from 'react-router';

import {
  defaultAddNewLessonArgs,
  useAddNewLessonMutation,
  useUpdateLessonMutation,
  useGetLessonsInCourseQuery,
  useDeleteLessonMutation,
} from 'services/lessons';
import Button from 'components/Button';
import Link from 'components/Link';
import Input from 'components/Input';
import Modal from 'components/Modal';
import { Lesson } from 'models';

interface CourseOverviewProps {
  courseId: string;
}

interface LessonFormProps {
  courseId: string;
  apiAction: (formData: any) => {};
  mutateButtonText: string;
  lesson?: Lesson | undefined;
}

const LessonForm = ({
  courseId,
  apiAction,
  mutateButtonText,
  lesson,
}: LessonFormProps) => {
  const { title = '', description = '' } = lesson || {};
  const formDefault = {
    courseId,
    ...defaultAddNewLessonArgs,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
  };

  const [formState, setFormState] = useState(formDefault);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setFormState({
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await apiAction(formState);
      setFormState(formDefault);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="mb-12">
        <div className="mb-6">
          <Input
            id="course-input"
            label="Enter the Title of a new lesson"
            name="title"
            onChange={handleInputChange}
            value={formState.title}
          />
        </div>
        <div className="mb-6">
          <Input
            id="course-input"
            label="Enter a brief description of this lesson"
            name="description"
            onChange={handleInputChange}
            value={formState.description}
          />
        </div>
      </div>
      <Button type="submit">{mutateButtonText}</Button>
    </form>
  );
};

const CoursePlanner = (props: any) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState('');
  const { courseId } = useParams<CourseOverviewProps>();
  const {
    data: lessons = [],
    error,
    isError,
    isFetching,
    isLoading,
  } = useGetLessonsInCourseQuery({ courseId });
  const [addNewLesson] = useAddNewLessonMutation();
  const [updateLesson] = useUpdateLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  if (isError) {
    console.log({ error });
  }

  return isLoading || isFetching ? (
    <div>Loading</div>
  ) : (
    <div>
      <h1 className="pb-4">Course Title</h1>
      <LessonForm
        {...{ courseId, apiAction: addNewLesson, mutateButtonText: 'Add' }}
      />
      <div className="py-12">
        <h2 className="pb-4">Lessons</h2>
        <ul>
          {lessons.map((lesson, key) => (
            <li
              className={classNames('rounded p-6 border-2', { 'mt-2': !!key })}
              key={lesson.lessonId}
            >
              <span className="flex justify-between align-baseline">
                <span>
                  <Link to={`/lessons/${lesson.lessonId}`}>{lesson.title}</Link>
                  <p className="mt-4 pr-4">{lesson.description}</p>
                </span>
                <span>
                  <Button
                    onClick={() => {
                      setEditingLesson(lesson.lessonId);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="red"
                    onClick={() => deleteLesson({ lessonId: lesson.lessonId })}
                    className="ml-2"
                  >
                    Delete
                  </Button>
                </span>
              </span>
              {isEditModalOpen && editingLesson === lesson.lessonId ? (
                <Modal
                  {...{
                    title: 'Edit Lesson Properties',
                    confirmButtonText: 'Close',
                    onConfirmation: () => {},
                    isOpen: isEditModalOpen,
                    setIsOpen: setIsEditModalOpen,
                  }}
                >
                  <LessonForm
                    {...{
                      courseId,
                      lesson,
                      apiAction: updateLesson,
                      mutateButtonText: 'Update',
                    }}
                  />
                </Modal>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursePlanner;
