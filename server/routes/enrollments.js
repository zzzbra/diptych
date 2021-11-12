const router = require('express').Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = require('../db');
const authorization = require('../middleware/auth');
const { camelCaseKeys, snakeCaseKeys } = require('../utils/formatting');

router.post('/enroll', authorization, async (req, res) => {
  const { course_id } = snakeCaseKeys(req.body);
  try {
    const newEnrollment = await pool.query(
      'INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) RETURNING *',
      [req.user, course_id],
    );

    res.json(camelCaseKeys(newEnrollment.rows[0]));
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

router.post('/withdraw', authorization, async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

router.get('', authorization, async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

module.exports = router;
