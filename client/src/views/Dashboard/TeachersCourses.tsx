import React from 'react';
import Link from 'components/Link';
import { useGetCoursesQuery } from 'services/courses';

const TeachersCourses = () => {
  const { data: courses = [] } = useGetCoursesQuery();

  return (
    <div className="pb-8">
      <h2>Courses you teach</h2>
      <ul>
        {courses.map((c) => (
          <li key={c.courseId}>
            <Link to={`/courses/${c.courseId}`}>{c.description}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeachersCourses;
