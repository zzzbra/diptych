import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getToken } from '../../utils/auth';

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

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await todosAPI.get('', {
        headers: { token: getToken() },
      });

      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
);

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

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    status: 'idle',
    error: null,
    todos: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.error = null;

        state.todos = action.payload.data.todos;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = 'error';
        // This should work?
        // state.error = action.error;
      });
  },
});

// export const { incrementCounter, decrementCounter } = counterSlice.actions;
// export default counterSlice.reducer;

export default todosAPI;
