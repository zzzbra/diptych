// Student dashboard
import classNames from 'classnames';
import React from 'react';
import { useGetCoursesQuery } from '../services/courses';
import Button from '../components/Button';
import {
  useEnrollMutation,
  useWithdrawMutation,
  useGetEnrollmentsQuery,
} from '../services/enrollments';

const Classroom = () => {
  const { data: enrollments = [] } = useGetEnrollmentsQuery();
  console.log({ enrollments });
  const [
    enroll,
    {
      error: enrollmentError,
      isError: isEnrollmentError,
      isLoading: isEnrollmentLoading,
    },
  ] = useEnrollMutation();
  const [withdraw] = useWithdrawMutation();
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

  const yourCourses =
    courses?.filter(({ courseId }) => enrollments.includes(courseId)) || [];

  const availableCourses =
    courses?.filter(({ courseId }) => !enrollments.includes(courseId)) || [];

  return (
    <div>
      <div>
        <h1 className="pb-6">Your Classes</h1>
        <ul>
          {yourCourses.map((course, key) => (
            <li
              className={classNames(
                'flex flex-row flex-no-wrap justify-between items-center mb-2 border-2 rounded p-4 border-gray-100',
                { 'mt-2': !!key, 'mt-4': !key },
              )}
              key={course.courseId}
            >
              <span>{course.description}</span>
              <Button onClick={() => withdraw({ courseId: course.courseId })}>
                Drop
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="pb-4">Other Available Classes</h2>
        <span className="pb-2">Pick from one of the following courses:</span>
        <ul>
          {availableCourses.map((course, key) => (
            <li
              className={classNames(
                'flex flex-row flex-no-wrap justify-between items-center mb-2 border-2 rounded p-4 border-gray-100',
                { 'mt-2': !!key, 'mt-4': !key },
              )}
              key={course.courseId}
            >
              <span>{course.description}</span>
              <Button onClick={() => enroll({ courseId: course.courseId })}>
                Enroll
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Classroom;
