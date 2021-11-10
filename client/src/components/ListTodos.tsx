import React from 'react';
import EditTodo from './EditTodo';
import Button from './Button';
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useGetTodosQuery,
} from '../app/services/todo';

const ListTodos = () => {
  const {
    data: todos = [],
    error,
    isError,
    isLoading,
    isFetching,
  } = useGetTodosQuery();

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  if (isError) {
    console.log(error);
    return <h1>Error!</h1>;
  }

  if (isLoading) return <h1>Loading...</h1>;

  if (isFetching) return <h1>Fetching...</h1>;

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
              onClick={() => deleteTodo({ id: todoId })}
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
