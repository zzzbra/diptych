// Teacher Dashboard
import React from 'react';

import InputTodo from '../components/InputTodo';
import ListTodos from '../components/ListTodos';

const Planner = ({ setIsAuthenticated }) => {
  return (
    <>
      <h1 className="text-3xl mb-6">My Decks</h1>
      <InputTodo />
      <div className="mt-10">
        <ListTodos />
      </div>
    </>
  );
};

export default Planner;
