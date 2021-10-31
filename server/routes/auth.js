const router = require('express').Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/auth');

const LOGIN_FAILURE_RESPONSE_MESSAGE = 'Password or Email is incorrect';

router.post('/register', validInfo, async (req, res) => {
  try {
    // 1. descructure the req.body()
    const { name, email, password, isTeacher } = req.body;

    // 2. check if user exists --> throw error if not
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length !== 0) {
      // Not very secure to communicate that this account exists...
      return res.status(401).send('User already exists');
    }

    // 3. Bcrypt user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. enter the new user inside our database
    const newUser = await pool.query(
      'INSERT INTO users(user_name, user_email, user_password, user_is_teacher) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, bcryptPassword, isTeacher],
    );

    // 5. generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('SERVER ERROR');
  }
});

router.post('/login', validInfo, async (req, res) => {
  try {
    // Check if user doesn't exist
    const { email, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      console.info('No such user registered.');
      return res.status(401).json(LOGIN_FAILURE_RESPONSE_MESSAGE);
    }

    // check if incoming password is the same as one in DB
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password,
    );

    if (!validPassword) {
      console.info('Invalid password.');
      return res.status(401).json(LOGIN_FAILURE_RESPONSE_MESSAGE);
    }

    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('SERVER ERROR');
  }
});

router.get('/is-authorized', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).send('SERVER ERROR');
  }
});

module.exports = router;
