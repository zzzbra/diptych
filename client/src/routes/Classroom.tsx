// Student dashboard
import classNames from 'classnames';
import React from 'react';
import { useGetCoursesQuery } from '../app/services/courses';
import Button from '../components/Button';
import { useAuth } from '../features/auth/hooks';

const Classroom = () => {
  const { user } = useAuth();
  const {
    data: courses,
    error,
    isError,
    isFetching,
    isLoading,
  } = useGetCoursesQuery();
  console.log({ courses });

  const enrollInCourse = (courseId: string) => {
    console.log(
      `TODO: add backed support for enrolling student with ID ${user?.userId} in course id ${courseId}`,
    );
  };

  if (isError) {
    console.log({ error });
  }

  return isFetching || isLoading ? (
    <div>Loading</div>
  ) : (
    <div>
      <span className="pb-2">Pick from one of the following courses:</span>
      <ul>
        {courses?.map((course, key) => (
          <li
            className={classNames(
              'flex flex-row flex-no-wrap justify-between items-center mb-2 border-2 rounded p-4 border-gray-100',
              { 'mt-2': !!key, 'mt-4': !key },
            )}
          >
            <span>{course.description}</span>
            <Button onClick={() => enrollInCourse(course.courseId)}>
              Enroll
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Classroom;
