const router = require('express').Router();
const pool = require('../db');

const authorization = require('../middleware/auth');

// create a todo
router.post('', authorization, async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *',
      [req.user, description],
    );

    res.json(newTodo.rows[0]);
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
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
router.get('/:todo_id', authorization, async (req, res) => {
  try {
    const { todo_id } = req.params;
    const todo = await pool.query('SELECT * FROM todos WHERE todo_id = $1', [
      todo_id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
router.put('/:todo_id', authorization, async (req, res) => {
  try {
    const { todo_id } = req.params;
    const { description } = req.body;
    const result = await pool.query(
      'UPDATE todos SET description = $1 WHERE todo_id = $2',
      [description, todo_id],
    );

    res.json('Todo was updated');
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
router.delete('/:todo_id', authorization, async (req, res) => {
  try {
    const { todo_id } = req.params;
    await pool.query('DELETE FROM todos WHERE todo_id = $1', [todo_id]);
    res.json('Todo was deleted');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
