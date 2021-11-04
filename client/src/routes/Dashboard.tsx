import React, { useEffect, useState } from 'react';

import { getUserProfileData } from '../features/profile/profile.slice';
import { UserProfile } from '../models';

import Classroom from './Classroom';
import Planner from './Planner';

const Dashboard = (props: any) => {
  const [userProfileData, setUserProfileData] = useState<
    UserProfile | undefined
  >({});

  useEffect(() => {
    const getData = async () => {
      const data = await getUserProfileData();
      setUserProfileData(data);
    };

    getData();
  }, []);

  // Get user's `isTeacher value here` and show Planner or Classroom
  const { user_is_teacher = false } = userProfileData || {};

  const View = user_is_teacher ? Planner : Classroom;

  return <View {...{ userProfileData, ...props }} />;
};

export default Dashboard;
