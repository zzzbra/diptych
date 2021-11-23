import Link from 'components/Link';
import React from 'react';

import StudentsClasses from './StudentsClasses';

const Dashboard = (props: any) => {
  return (
    <div className="py-8">
      <h1 className="pb-4">Welcome to MOOC-SRS</h1>
      <StudentsClasses />

      <h2>TODO: show what reviews are ready</h2>

      <h3 className="py-4 border-t-2">More</h3>
      <Link to="/registrar">Add/Drop Classes</Link>
    </div>
  );
};

export default Dashboard;
