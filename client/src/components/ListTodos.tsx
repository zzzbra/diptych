import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo';
import Button from './Button';
import { getTodos, deleteTodo, updateTodo } from '../apis/todos';
import { Todo } from '../models';

const ListTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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
            <Button
              className="ml-4"
              color="red"
              onClick={() => deleteTodo(todo_id)}
            >
              Delete
            </Button>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ListTodos;
