import React from 'react';

import { useAuth } from 'features/auth/hooks';
import InputCourse from './InputCourse';
import ListCourses from './ListCourses';
import AllClasses from './AllClasses';

const Planner = () => {
  const { user } = useAuth();

  return (
    <>
      <h2>Greetings, Mr./Ms. {user?.userName}!</h2>
      <h1>Courses You Teach</h1>
      <ListCourses />
      <div className="mt-12 pt-4 border-t-2">
        <h2>Add new courses to curriculum</h2>
        <InputCourse />
      </div>

      <div className="mt-12 pt-4 border-t-2">
        <AllClasses />
      </div>
    </>
  );
};

export default Planner;
