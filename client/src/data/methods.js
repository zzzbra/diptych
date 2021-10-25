export const getTodos = async (setTodos) => {
  try {
    const response = await fetch('http://localhost:5000/todos');
    const data = await response.json();
    setTodos(data);
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = async ({ id, description }) => {
  try {
    const body = { description };
    await fetch(`http://localhost:5000/todos/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (id) => {
  try {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }
};
