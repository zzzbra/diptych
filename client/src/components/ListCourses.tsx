import React from 'react';
import EditCourse from './EditCourse';
import Button from './Button';
import Link from './Link';
import {
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetCoursesQuery,
} from '../app/services/courses';

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

  if (isError) {
    console.log(error);
    return <h1>Error!</h1>;
  }

  if (isLoading) return <h1>Loading...</h1>;

  if (isFetching) return <h1>Fetching...</h1>;

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
                  updateCourse({ description, id: courseId }),
              }}
            />
            <Button
              className="ml-4"
              color="red"
              onClick={() => deleteCourse({ id: courseId })}
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
