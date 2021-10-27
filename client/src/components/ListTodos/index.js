import React, { useEffect, useState } from 'react';
import EditTodo from '../EditTodo';
import { getTodos, deleteTodo, updateTodo } from '../../apis/todos';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos(setTodos);
  }, []);

  return (
    <ul className="flex flex-col">
      {todos.map(({ todo_id, description }) => (
        <li
          key={todo_id}
          className="flex flex-row flex-no-wrap justify-between items-baseline mb-2 border-b-1 border-gray-100"
        >
          <span className="pr-2">{description}</span>
          <span className="flex flex-row flex-nowrap items-center">
            <EditTodo
              {...{
                previousDescription: description,
                updateTodo: (description) =>
                  // capturing the todo_id in a closure
                  updateTodo({ description, id: todo_id }),
              }}
            />
            <button
              className="ml-4 p-2 bg-red-700 rounded-lg border text-white hover:bg-red-800 font-medium text-sm px-5 py-2.5 text-center"
              onClick={() => deleteTodo(todo_id)}
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
