import Link from 'components/Link';
import React from 'react';
import TeachersCourses from './TeachersCourses';

import TeachersStudents from './TeachersStudents';

const Dashboard = (props: any) => {
  return (
    <div className="py-8">
      <h1 className="pb-4">Welcome to MOOC-SRS</h1>
      <TeachersStudents />
      <TeachersCourses />
      <h3 className="pb-4">More</h3>
      <Link to="/registrar">Manage your curriculum</Link>
    </div>
  );
};

export default Dashboard;
