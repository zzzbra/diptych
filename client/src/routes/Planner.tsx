import React from 'react';

import InputTodo from '../components/InputTodo';
import ListTodos from '../components/ListTodos';
import { useAuth } from '../features/auth/hooks';

const Planner = () => {
  const { user } = useAuth();

  return (
    <>
      <h2 className="text-l mb-3">Greetings, {user?.userName}!</h2>
      <h1 className="text-3xl mb-6">My Decks</h1>
      <InputTodo />
      <div className="mt-10">
        <ListTodos />
      </div>
    </>
  );
};

export default Planner;
