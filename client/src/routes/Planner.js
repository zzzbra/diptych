// Teacher Dashboard
import React from 'react';

import PageContentWrapper from '../components/PageContentWrapper';
import InputTodo from '../components/InputTodo';
import ListTodos from '../components/ListTodos';

const Planner = () => {
  return (
    <PageContentWrapper>
      <h1 className="6xl">My Decks</h1>
      <InputTodo />
      <div className="mt-10">
        <ListTodos />
      </div>
    </PageContentWrapper>
  );
};

export default Planner;
