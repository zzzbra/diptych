import { TODO_TAG_TYPE } from './../tagTypes';
// import axios from 'axios';

import baseApi from './baseApi';
// import { getToken } from '../../features/auth/utils';
import { Todo } from '../../models';

interface GetTodoArgs {
  id: string;
}

interface AddNewTodoArgs {
  description: string;
}

interface UpdateTodoArgs {
  id: string;
  description: string;
}

interface DeleteTodoArgs {
  id: string;
}

const newTodosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<Todo[], void>({
      query: () => ({
        url: 'v1/todos',
        method: 'get',
      }),
      providesTags: [TODO_TAG_TYPE],
    }),
    getTodo: build.query<Todo, GetTodoArgs>({
      query: ({ id }) => {
        console.log('getting this todo id: ', id);
        return {
          url: `v1/todos/${id}`,
          method: 'get',
        };
      },
      providesTags: [TODO_TAG_TYPE],
    }),
    addNewTodo: build.mutation<Todo, AddNewTodoArgs>({
      query: (data) => ({
        url: 'v1/todos',
        method: 'post',
        data,
      }),
      invalidatesTags: [TODO_TAG_TYPE],
    }),
    updateTodo: build.mutation<Todo, UpdateTodoArgs>({
      query: ({ id, description }) => ({
        url: `v1/todos/${id}`,
        method: 'put',
        data: { description },
      }),
      invalidatesTags: [TODO_TAG_TYPE],
    }),
    deleteTodo: build.mutation<Todo[], DeleteTodoArgs>({
      query: ({ id }) => ({
        url: `v1/todos/${id}`,
        method: 'delete',
      }),
      invalidatesTags: [TODO_TAG_TYPE],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useAddNewTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = newTodosApi;
