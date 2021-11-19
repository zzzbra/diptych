import Link from 'components/Link';
import React from 'react';

import { useAuth } from 'features/auth/hooks';
import StudentsClasses from './StudentsClasses';
import TeachersStudents from './TeachersStudents';

const Dashboard = (props: any) => {
  const { user } = useAuth();
  console.log({ user });

  const linkText = user?.userIsTeacher
    ? 'Manage your curriculum'
    : 'Add/Drop Classes';

  return (
    <div className="py-8">
      <h1 className="pb-4">Welcome to MOOC-SRS</h1>
      {user?.userIsTeacher ? <TeachersStudents /> : <StudentsClasses />}

      <h3 className="pb-4">More</h3>
      <Link to="/registrar">{linkText}</Link>
    </div>
  );
};

export default Dashboard;
