const router = require('express').Router();
const mapKeys = require('lodash/mapKeys');
const camelCase = require('lodash/camelCase');

const pool = require('../db');
const authorization = require('../middleware/auth');

const camelCaseKeys = (todoFromDb) =>
  mapKeys(todoFromDb, (_, key) => camelCase(key));

// create a todo
router.post('', authorization, async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *',
      [req.user, description],
    );

    res.json(camelCaseKeys(newTodo.rows[0]));
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
router.get('', authorization, async (req, res) => {
  try {
    const allTodos = await pool.query(
      'SELECT * FROM todos WHERE user_id = $1',
      [req.user],
    );

    const responseBody = allTodos.rows.map(camelCaseKeys(row));

    res.json(responseBody);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
router.get('/:todo_id', authorization, async (req, res) => {
  try {
    const { todo_id } = req.params;
    const todo = await pool.query(
      'SELECT * FROM todos WHERE todo_id = $1 AND user_id = $2',
      [todo_id, req.user],
    );

    res.json(camelCaseKeys(todo.rows[0]));
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
router.put('/:todo_id', authorization, async (req, res) => {
  try {
    const { todo_id } = req.params;
    const { description } = req.body;
    const updatedTodo = await pool.query(
      'UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *',
      [description, todo_id, req.user],
    );

    res.json(updatedTodo.rows.map((row) => camelCaseKeys(row)));
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
router.delete('/:todo_id', authorization, async (req, res) => {
  try {
    const { todo_id } = req.params;
    const updatedTodos = await pool.query(
      'DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *',
      [todo_id, req.user],
    );

    res.json(updatedTodos.rows.map((row) => camelCaseKeys(row)));
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
