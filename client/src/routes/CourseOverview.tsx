import classNames from 'classnames';
import React, { useState } from 'react';
import { useParams } from 'react-router';

import {
  defaultAddNewLessonArgs,
  useAddNewLessonMutation,
  useGetLessonsQuery,
  useDeleteLessonMutation,
  DeleteLessonArgs,
} from '../app/services/lessons';
import Button from '../components/Button';
import Link from '../components/Link';
import Input from '../components/Input';
import { useAuth } from '../features/auth/hooks';

interface CourseOverviewProps {
  courseId: string;
}

const CourseOverview = (props: any) => {
  const { courseId } = useParams<CourseOverviewProps>();
  const formDefault = {
    courseId,
    ...defaultAddNewLessonArgs,
  };
  const { user } = useAuth();
  const [formState, setFormState] = useState(formDefault);
  const {
    data: lessons = [],
    error,
    isError,
    isFetching,
    isLoading,
  } = useGetLessonsQuery({ courseId });
  const [addNewLesson] = useAddNewLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setFormState({
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addNewLesson(formState);
      console.log('calling setFormState');
      setFormState(formDefault);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleEditLesson = () => {
    window.alert("You can't do that right now.");
  };
  const handleDeleteLesson = ({ courseId, lessonId }: DeleteLessonArgs) =>
    deleteLesson({ courseId, lessonId });

  if (isError) {
    console.log({ error });
  }
  return isLoading || isFetching ? (
    <div>Loading</div>
  ) : (
    <div>
      <h1 className="pb-4">Course Title</h1>

      {user?.userIsTeacher ? (
        <form className="pb-8" onSubmit={handleSubmit}>
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
          <Button type="submit">Add</Button>
        </form>
      ) : null}

      <h2 className="pb-4">Lessons</h2>
      <ul>
        {lessons.map((lesson, key) => (
          <li
            className={classNames('rounded p-6 border-2', { 'mt-2': !!key })}
            key={lesson.lessonId}
          >
            <span className="flex justify-between align-baseline">
              <span>
                <Link
                  to={`/courses/${lesson.courseId}/lessons/${lesson.lessonId}`}
                >
                  {lesson.title}
                </Link>
                <p className="mt-4 pr-4">{lesson.description}</p>
              </span>
              {user?.userIsTeacher ? (
                <span>
                  <Button onClick={handleEditLesson}>Edit</Button>
                  <Button
                    color="red"
                    onClick={() => handleDeleteLesson}
                    className="ml-2"
                  >
                    Delete
                  </Button>
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseOverview;
