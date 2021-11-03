import axios from 'axios';
import React from 'react';

import { getToken } from '../utils/auth';
import { Todo } from '../models';

// TODO: set up FE env variables
// const protocol = process.env.SERVER_PROTOCOL || 'http';
// const host = process.env.SERVER_HOST || 'localhost';
// const port = process.env.SERVER_PORT || '5000';
const protocol = 'http';
const host = 'localhost';
const port = '5000';

const todosAPI = axios.create({
  baseURL: `${protocol}://${host}:${port}/api/v1/todos`,
});

export const getTodos = async (setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) => {
  try {
    const { data } = await todosAPI.get('', { headers: { token: getToken() } });
    setTodos(data);
  } catch (error) {
    console.error(error);
  }
};

interface UpdateTodoArgs {
  id: string,
  description: string
}

export const updateTodo = async ({ id, description }: UpdateTodoArgs) => {
  try {
    await todosAPI.put(
      `/${id}`,
      {
        description,
      },
      {
        headers: {
          token: getToken(),
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await todosAPI.delete(`/${id}`, {
      headers: {
        token: getToken(),
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default todosAPI;
