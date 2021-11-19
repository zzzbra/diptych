import React from 'react';
import { useGetCoursesQuery } from 'services/courses';
import { useGetEnrollmentsQuery } from 'services/enrollments';
import Link from 'components/Link';

const StudentsClasses = () => {
  const { data: enrollments } = useGetEnrollmentsQuery();
  const { data: courses } = useGetCoursesQuery();

  const enrolledCourses =
    courses?.filter(({ courseId }) => enrollments?.includes(courseId)) || [];

  return (
    <div className="mb-12">
      <h2>My Classes</h2>
      <ul>
        {enrolledCourses.map((course) => (
          <li
            key={course.courseId}
            className="p-2 mb-2 border-2 flex justify-between"
          >
            <span>{course.description}</span>
            <Link to={`/study-session?courseId=${course.courseId}`}>
              View course
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsClasses;
