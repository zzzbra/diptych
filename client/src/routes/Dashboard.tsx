import React from 'react';

import { useAuth } from '../features/auth/hooks';
import Classroom from './Classroom';
import Planner from './Planner';

const Dashboard = (props: any) => {
  const { user } = useAuth();
  return user?.userIsTeacher ? <Planner /> : <Classroom />;
};

export default Dashboard;
