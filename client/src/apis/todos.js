import axios from 'axios';

const protocol = process.env.SERVER_PROTOCOL || 'https';
const host = process.env.SERVER_HOST || 'localhost';
const port = process.env.SERVER_PORT || '5000';

const todosAPI = axios.create({
  baseURL: `${protocol}://${host}:${port}/api/v1/todos`,
});

export const getTodos = async (setTodos) => {
  try {
    const { data } = await todosAPI.get('http://localhost:5000/api/v1/todos');
    setTodos(data);
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = async ({ id, description }) => {
  try {
    await todosAPI.put(`http://localhost:5000/api/v1/todos/${id}`, {
      description,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (id) => {
  try {
    await todosAPI.delete(`http://localhost:5000/api/v1/todos/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export default todosAPI;
