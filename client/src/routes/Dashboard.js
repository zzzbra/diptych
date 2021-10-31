import React, { useEffect, useState } from 'react';

import { getUserProfileData } from '../apis/profile';

import Classroom from './Classroom';
import Planner from './Planner';

const Dashboard = (props) => {
  const [userProfileData, setUserProfileData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data } = await getUserProfileData();
      setUserProfileData(data);
    };

    getData();
  }, []);

  // Get user's `isTeacher value here` and show Planner or Classroom
  const isTeacher = userProfileData.user_is_teacher;

  const View = isTeacher ? Planner : Classroom;

  return <View {...props} />;
};

export default Dashboard;
