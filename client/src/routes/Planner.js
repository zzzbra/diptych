// Teacher Dashboard
import React from 'react';

import InputTodo from '../components/InputTodo';
import ListTodos from '../components/ListTodos/index';

const Planner = () => {
  return (
    <div className="max-w-lg mx-auto py-10">
      <InputTodo />
      <div className="mt-10">
        <ListTodos />
      </div>
    </div>
  );
};

export default Planner;