import React from 'react';
import { useAuth } from 'features/auth/hooks';
import { useGetCoursesOfferedByTeacherQuery } from 'services/courses';
import { useGetEnrollmentsQuery } from 'services/enrollments';
import { useGetStudentsQuery } from 'services/auth';

const TeachersStudents = () => {
  const { user } = useAuth();
  // const { data: courses } = useGetCoursesQuery();
  const { data: teachersCourses = [] } = useGetCoursesOfferedByTeacherQuery({
    userId: user?.userId || '',
  });
  const teachersCourseIds = teachersCourses.map(({ courseId }) => courseId);
  const { data: enrollments = [] } = useGetEnrollmentsQuery();
  const { data: students = [] } = useGetStudentsQuery();

  const studentIds = enrollments
    .filter(({ courseId = '' }) => teachersCourseIds.includes(courseId))
    .map(({ studentId = '' }) => studentId)
    .filter((value, index, self) => self.indexOf(value) === index);

  const myStudents = students.filter(({ userId }) =>
    studentIds.includes(userId),
  );

  return (
    <div className="pb-8">
      <h2>My Students</h2>
      <ul>
        {myStudents.map((s, key) => (
          <li key={s.userId}>
            {key + 1}) {s.userName}, {s.userEmail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeachersStudents;
