import React, { useState } from 'react'
import Input from './Input';

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const handleInputChange = (e) => setDescription(e.target.value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setDescription("");
    } catch (error) {
      console.error(error.message);
    }
  }

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
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add</button>
    </form>
  );
}

export default InputTodo;
