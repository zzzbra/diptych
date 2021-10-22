import React from 'react'

const ListTodos = () => {
  const todos = [];
  return (
    <ul>
      {todos.map(todo => (
        <li>
          <span>{todo.description}</span>
          <span><button>Edit</button></span>
          <span><button>Delete</button></span>
        </li>
      ))}
    </ul>
  );
}

export default ListTodos
