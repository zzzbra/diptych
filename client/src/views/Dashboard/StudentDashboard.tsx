import React from 'react';

import StudentReviewOverview from './StudentReviewOverview';
import StudentsClasses from './StudentsClasses';
import Link from 'components/Link';

const Dashboard = (props: any) => {
  return (
    <div className="py-8">
      <h1 className="pb-4">Welcome to Diptych</h1>

      <StudentsClasses />
      <StudentReviewOverview />

      <h3 className="py-4 border-t-2">More</h3>
      <Link to="/registrar">Add/Drop Classes</Link>
    </div>
  );
};

export default Dashboard;
