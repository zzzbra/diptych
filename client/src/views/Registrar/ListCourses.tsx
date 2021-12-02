import React from 'react';

import Button from 'components/Button';
import Link from 'components/Link';
import {
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetCoursesQuery,
} from 'services/courses';
import EditCourse from './EditCourse';
import Spinner from 'components/Spinner';
import ErrorMessage from 'components/ErrorMessage';

const ListCourses = () => {
  const {
    data: courses = [],
    error,
    isError,
    isLoading,
    isFetching,
  } = useGetCoursesQuery();

  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  if (isError) return <ErrorMessage {...{ error }} />;

  if (isLoading || isFetching) return <Spinner />;

  return (
    <ul className="flex flex-col">
      {courses.map(({ courseId, description }) => (
        <li
          key={courseId}
          className="flex flex-row flex-no-wrap justify-between items-baseline mb-2 border-b-1 border-gray-100"
        >
          <Link to={`/courses/${courseId}`}>{description}</Link>
          <span className="flex flex-row flex-nowrap items-center">
            <EditCourse
              {...{
                previousDescription: description,
                updateCourse: (description) =>
                  // capturing the todoId in a closure
                  updateCourse({ description, courseId }),
              }}
            />
            <Button
              className="ml-4"
              color="red"
              onClick={() => deleteCourse({ courseId })}
            >
              Delete
            </Button>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ListCourses;
