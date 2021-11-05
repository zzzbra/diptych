import React from 'react';

import { UserProfile } from '../models';
import InputTodo from '../components/InputTodo';
import ListTodos from '../components/ListTodos';

interface PlannerProps {
  userProfileData: UserProfile;
}

const Planner = ({ userProfileData }: PlannerProps) => {
  const { userName } = userProfileData;
  return (
    <>
      <h2 className="text-l mb-3">Greetings, {userName}!</h2>
      <h1 className="text-3xl mb-6">My Decks</h1>
      <InputTodo />
      <div className="mt-10">
        <ListTodos />
      </div>
    </>
  );
};

export default Planner;
