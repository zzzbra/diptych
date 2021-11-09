import axios from 'axios';

import baseApi from '../../app/services/baseApi';
import { getToken } from '../auth/utils';
import { Todo, TodosResponse } from '../../models';

// TODO: set up FE env variables
const protocol = 'http';
const host = 'localhost';
const port = '5000';
const baseUrl = `${protocol}://${host}:${port}/api/v1/todos`;

const todosAPI = axios.create({ baseURL: baseUrl });

export const getTodos = async () => {
  try {
    const { data } = await todosAPI.get('', {
      headers: { token: getToken() },
    });

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

interface UpdateTodoArgs {
  id: string;
  description: string;
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

const newTodosApi = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      // what about all my other methods etc...
      // query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
      // mutation: build.mutation({
      //   query: () => ({ url: '/mutation', method: 'post' }),
      // }),
      getTodos: build.query<TodosResponse, void>({
        query: () => ({
          url: 'v1/todos',
          method: 'get',
        }),
      }),
      addNewTodo: build.mutation<Todo, void>({
        query: (description) => ({
          url: '/v1/todos',
          method: 'post',
          body: description,
        }),
      }),
    };
  },
});

export const { useGetTodosQuery, useAddNewTodoMutation } = newTodosApi;
