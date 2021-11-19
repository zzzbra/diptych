import React from 'react';
import { useAuth } from 'features/auth/hooks';
import { useGetCoursesQuery } from 'services/courses';
import { useGetEnrollmentsQuery } from 'services/enrollments';

const TeachersStudents = () => {
  const { user } = useAuth();
  const { data: courses } = useGetCoursesQuery();
  const { data: enrollments } = useGetEnrollmentsQuery();

  console.log({ user }, { courses }, { enrollments });

  return (
    <div>
      <h2>My Students</h2>
      TODO: list all students here.
    </div>
  );
};

export default TeachersStudents;
