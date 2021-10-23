import React, { useEffect, useState } from 'react';
import EditTodo from '../EditTodo';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  });

  return (
    <ul className="flex flex-col">
      {todos.map((todo) => (
        <li
          key={todo.todo_id}
          className="flex flex-row flex-no-wrap justify-between items-baseline mb-2 border-b-1 border-gray-100"
        >
          <span className="pr-2">{todo.description}</span>
          <span className="flex flex-row flex-nowrap items-center">
            <EditTodo todoId={todo.todo_id} />
            <button
              className="ml-4 p-2 bg-red-700 rounded-lg border text-white hover:bg-red-800 font-medium text-sm px-5 py-2.5 text-center"
              onClick={() => deleteTodo(todo.todo_id)}
            >
              Delete
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ListTodos;
