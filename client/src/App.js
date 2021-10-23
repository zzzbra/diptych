import React from 'react';

import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos/index';
import Modal from './components/Modal';

function App() {
  return (
    <div className="max-w-lg mx-auto py-10">
      <InputTodo />
      <div className="mt-10">
        <ListTodos />
      </div>
      <Modal />
    </div>
  );
}

export default App;
