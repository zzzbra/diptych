// import React, { useEffect, useState } from 'react';
import React from 'react';
import EditTodo from './EditTodo';
import Button from './Button';
// import { getTodos, deleteTodo, updateTodo } from '../features/todos/todo.slice';
import {
  deleteTodo,
  updateTodo,
  useGetTodosQuery,
} from '../features/todo/todo.slice';
// import { Todo } from '../models';

const ListTodos = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [todos] = useState<Todo[]>([]);
  const { data: todos = [], error, isLoading } = useGetTodosQuery();

  // useEffect(() => {
  //   getTodos();
  //   // FIXME
  //   // getTodos(setTodos);
  // }, []);

  if (isLoading) return <h1>Loading</h1>;

  if (!!error) {
    console.log(error);
    return <h1>Error!</h1>;
  }

  return (
    <ul className="flex flex-col">
      {todos.map(({ todoId, description }) => (
        <li
          key={todoId}
          className="flex flex-row flex-no-wrap justify-between items-baseline mb-2 border-b-1 border-gray-100"
        >
          <span className="pr-2">{description}</span>
          <span className="flex flex-row flex-nowrap items-center">
            <EditTodo
              {...{
                previousDescription: description,
                updateTodo: (description) =>
                  // capturing the todoId in a closure
                  updateTodo({ description, id: todoId }),
              }}
            />
            <Button
              className="ml-4"
              color="red"
              onClick={() => deleteTodo(todoId)}
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
