import React from 'react';

import InputCourse from '../components/InputCourse';
import ListCourses from '../components/ListCourses';
import { useAuth } from '../features/auth/hooks';

const Planner = () => {
  const { user } = useAuth();

  return (
    <>
      <h2 className="text-l mb-3">Greetings, Mr./Ms. {user?.userName}!</h2>
      <h1 className="text-3xl mb-6">My Courses</h1>
      <InputCourse />
      <div className="mt-10">
        <ListCourses />
      </div>
    </>
  );
};

export default Planner;
