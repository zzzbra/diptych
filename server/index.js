require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const pool = require('./db');
const auth = require('./routes/auth');

const PORT = process.env.SERVER_PORT;

// middleware
app.use(cors());
app.use(morgan('dev')); // predefined: combined, common, dev, short, tiny
app.use(express.json()); // req.body

// Routes

// register & login

app.use('/api/v1/auth', auth);

// create a todo
app.post('/api/v1/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description],
    );

    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get('/api/v1/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get('/api/v1/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put('/api/v1/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const result = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id],
    );

    res.json('Todo was updated');
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete('/api/v1/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    res.json('Todo was deleted');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
