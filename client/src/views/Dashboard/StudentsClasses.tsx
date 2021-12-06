import React from 'react';
import { useGetCoursesQuery } from 'services/courses';
import { useGetStudentsEnrollmentsQuery } from 'services/enrollments';
import Link from 'components/Link';
import { useAuth } from 'features/auth/hooks';

const StudentsClasses = () => {
  const { user } = useAuth();
  const {
    data: enrollments,
    isError,
    error,
    isFetching,
  } = useGetStudentsEnrollmentsQuery({ studentId: user?.userId || '' });
  const {
    data: courses,
    error: coursesError,
    isError: isCoursesError,
    isFetching: isCoursesFetching,
  } = useGetCoursesQuery();

  if (isError) {
    return <div>{JSON.stringify(error, null, 2)}</div>;
  }

  if (isCoursesError) {
    return <div>{JSON.stringify(coursesError, null, 2)}</div>;
  }

  if (isFetching || isCoursesFetching) {
    <h1>Loading...</h1>;
  }

  const enrolledCourses =
    courses?.filter(({ courseId }) =>
      enrollments?.map(({ courseId }) => courseId).includes(courseId),
    ) || [];

  return (
    <div className="mb-12">
      <h2>My Classes</h2>
      <ul>
        {enrolledCourses.map((course) => (
          <li
            key={course.courseId}
            className="p-4 mb-2 border-2 flex justify-between"
          >
            <Link to={`/courses/${course.courseId}`}>{course.description}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsClasses;
