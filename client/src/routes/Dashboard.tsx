import React, { useEffect, useState } from 'react';

import { getUserProfileData } from '../features/profile/profile.slice';
import { UserProfile } from '../models';

import Classroom from './Classroom';
import Planner from './Planner';

const Dashboard = (props: any) => {
  const [userProfileData, setUserProfileData] = useState<
    UserProfile | undefined
  >(); // default previously needed to be an empty object...

  useEffect(() => {
    const getData = async () => {
      const data = await getUserProfileData();
      setUserProfileData(data);
    };

    getData();
  }, []);

  // Get user's `isTeacher value here` and show Planner or Classroom
  const { userIsTeacher = false } = userProfileData || {};

  const View = userIsTeacher ? Planner : Classroom;

  return <View {...{ userProfileData, ...props }} />;
};

export default Dashboard;
