const router = require('express').Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

const db = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/auth');

const { encryptPassword } = require('../utils/crypto');

const LOGIN_FAILURE_RESPONSE_MESSAGE = 'Password or Email is incorrect';

const buildAuthResponse = (userRowFromDatabase = {}) => {
  const {
    user_id: userId,
    user_name: userName,
    user_email: userEmail,
    user_is_teacher: userIsTeacher,
  } = userRowFromDatabase;

  const token = jwtGenerator(userId);

  return {
    user: {
      userId,
      userName,
      userEmail,
      userIsTeacher,
    },
    token,
  };
};

router.post('/register', validInfo, async (req, res) => {
  try {
    // 1. descructure the req.body()
    const { name, email, password, isTeacher } = req.body;

    // 2. check if user exists --> throw error if not
    const users = await db('users').where({ user_email: email }).select();

    if (users.length !== 0) {
      // Not very secure to communicate that this account exists...
      return res.status(401).send('User already exists');
    }

    // 3. Bcrypt user passwor
    const encryptedPassword = await encryptPassword(password);

    // 4. enter the new user inside our database
    const [user] = await db('users').insert(
      {
        user_name: name,
        user_email: email,
        user_password: encryptedPassword,
        user_is_teacher: isTeacher,
      },
      ['user_name', 'user_email', 'user_id', 'user_is_teacher'],
    );

    // 5. generating our jwt token
    const responseBody = buildAuthResponse(user);

    res.json(responseBody);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('SERVER ERROR');
  }
});

router.post('/login', validInfo, async (req, res) => {
  try {
    // Check if user doesn't exist
    const { email, password } = req.body;
    const users = await db('users').where({ user_email: email }).select();

    if (users.length === 0) {
      console.info('No such user registered.');
      return res.status(401).json(LOGIN_FAILURE_RESPONSE_MESSAGE);
    }

    const [user] = users;

    // check if incoming password is the same as one in DB
    const validPassword = await bcrypt.compare(password, user.user_password);

    if (!validPassword) {
      console.info('Invalid password.');
      return res.status(401).json(LOGIN_FAILURE_RESPONSE_MESSAGE);
    }

    const responseBody = buildAuthResponse(user);
    res.json(responseBody);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('SERVER ERROR');
  }
});

router.get('/is-authenticated', authorization, async (req, res) => {
  try {
    const [user] = await db('users').where({ user_id: req.user }).select();

    res.json(buildAuthResponse(user));
  } catch (error) {
    console.error(error);
    res.status(500).send('SERVER ERROR');
  }
});

module.exports = router;
