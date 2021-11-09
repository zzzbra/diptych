import React, { useState } from 'react';
import Input from './Input';
import todosAPI from '../features/todo/todo.slice';
import Button from './Button';
import { getToken } from '../features/auth/utils';

const InputTodo = () => {
  const [description, setDescription] = useState('');

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setDescription(e.currentTarget.value);

  // TODO: genericize and move out to api/todos
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (error: any) {
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
