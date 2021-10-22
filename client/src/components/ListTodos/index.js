import React, { useEffect, useState } from 'react'

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTodos();
  });

  return (
    <ul>
      {todos.map(todo => (
        <li>
          <span>{todo.description}</span>
          <span><button>Edit</button></span>
          <span><button>Delete</button></span>
        </li>
      ))}
    </ul>
  );
}

export default ListTodos
