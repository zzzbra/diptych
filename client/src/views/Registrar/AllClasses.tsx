import React from 'react';

import { useGetCoursesQuery } from 'services/courses';

const AllClasses = () => {
  const { data: courses = [] } = useGetCoursesQuery();
  // const trClasses = 'border-b-2 py-2';
  const trClasses = '';
  return (
    <>
      <h2>All Courses at Diptych</h2>
      <table>
        <thead>
          <tr className={trClasses}>
            <th scope="cols">Course ID</th>
            <th scope="cols">Course Title</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr className={trClasses} key={course.courseId}>
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
