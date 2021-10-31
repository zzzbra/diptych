const omit = require('lodash/omit');
const router = require('express').Router();

const pool = require('../db');
const authorization = require('../middleware/auth');

router.get('/', authorization, async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      req.user,
    ]);
    console.log(user.rows[0]);

    res.json(omit(user.rows[0], 'user_password'));
  } catch (error) {
    console.error(error.message);
    res.status(500).send('SERVER ERROR');
  }
});

module.exports = router;
