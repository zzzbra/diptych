import React, { useState } from 'react';
import Input from './Input';
import todosAPI from '../apis/todos';
import Button from './Button';
import { getToken } from '../utils/auth';

const InputTodo = () => {
  const [description, setDescription] = useState('');

  const handleInputChange = (e) => setDescription(e.target.value);

  // TODO: genericize and move out to api/todos
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await todosAPI.post(
        '',
        {
          description,
        },
        {
          headers: {
            token: getToken(),
          },
        },
      );
      setDescription('');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-6">
        <Input
          id="todo-input"
          label="Enter your next to-do below"
          onChange={handleInputChange}
          placeholder="What Good shall I do today?"
          value={description}
        />
      </div>
      <Button type="submit">Add</Button>
    </form>
  );
};

export default InputTodo;
