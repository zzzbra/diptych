import React from 'react';

import { useGetCoursesQuery } from 'services/courses';

const AllClasses = () => {
  const { data: courses = [] } = useGetCoursesQuery();
  return (
    <>
      <h2>All Courses at MOOC-SRS</h2>
      <table>
        <thead>
          <tr>
            <th scope="cols">Course ID</th> <th scope="cols">Course Title</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.courseId}>
              <td>{course.courseId}.</td>
              <td>{course.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AllClasses;
