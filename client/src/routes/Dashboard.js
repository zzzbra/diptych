import React, { useEffect, useState } from 'react';

import { getUserProfileData } from '../apis/profile';

import Classroom from './Classroom';
import Planner from './Planner';

const Dashboard = (props) => {
  const [userProfileData = {}, setUserProfileData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data = {} } = await getUserProfileData();
      setUserProfileData(data);
    };

    getData();
  }, []);

  // Get user's `isTeacher value here` and show Planner or Classroom
  const { user_is_teacher = false } = userProfileData;

  const View = user_is_teacher ? Planner : Classroom;

  return <View {...{ userProfileData, ...props }} />;
};

export default Dashboard;
