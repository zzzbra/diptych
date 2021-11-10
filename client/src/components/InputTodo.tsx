import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { useAddNewTodoMutation } from '../app/services/todo';

const InputTodo = () => {
  const [description, setDescription] = useState('');
  const [addNewTodo, { isLoading }] = useAddNewTodoMutation();

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setDescription(e.currentTarget.value);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addNewTodo({ description });
      setDescription('');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
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
