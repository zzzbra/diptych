import React from 'react';

import { useAuth } from 'features/auth/hooks';
import InputCourse from './InputCourse';
import ListCourses from './ListCourses';

const Planner = () => {
  const { user } = useAuth();

  return (
    <>
      <h2 className="text-l mb-3">Greetings, Mr./Ms. {user?.userName}!</h2>
      <h1 className="text-3xl mb-6">Courses I Teach</h1>
      <ListCourses />
      <div className="pt-10">
        <h2 className="pb-4">Add new courses to curriculum</h2>
        <InputCourse />
      </div>
    </>
  );
};

export default Planner;
