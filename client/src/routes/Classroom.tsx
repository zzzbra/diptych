// Student dashboard
import classNames from 'classnames';
import React from 'react';
import { useGetCoursesQuery } from '../app/services/courses';
import Button from '../components/Button';
import { useAuth } from '../features/auth/hooks';
import { useAddNewEnrollmentMutation } from '../app/services/enrollments';

const Classroom = () => {
  const { user } = useAuth();
  const [
    addNewEnrollment,
    {
      error: enrollmentError,
      isError: isEnrollmentError,
      isLoading: isEnrollmentLoading,
    },
  ] = useAddNewEnrollmentMutation();
  const {
    data: courses,
    error,
    isError,
    isFetching,
    isLoading,
  } = useGetCoursesQuery();

  if (isError || isEnrollmentError) {
    console.log({ error }, { enrollmentError });
  }

  if (isFetching || isLoading || isEnrollmentLoading) return <div>Loading</div>;

  return (
    <div>
      <span className="pb-2">Pick from one of the following courses:</span>
      <ul>
        {courses?.map((course, key) => (
          <li
            className={classNames(
              'flex flex-row flex-no-wrap justify-between items-center mb-2 border-2 rounded p-4 border-gray-100',
              { 'mt-2': !!key, 'mt-4': !key },
            )}
            key={course.courseId}
          >
            <span>{course.description}</span>
            <Button
              onClick={() => addNewEnrollment({ courseId: course.courseId })}
            >
              Enroll
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Classroom;
