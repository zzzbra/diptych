const router = require('express').Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

const db = require('../db');
const authorization = require('../middleware/auth');
const { camelCaseKeys, snakeCaseKeys } = require('../utils/formatting');

router.post('/enroll', authorization, async (req, res) => {
  const { course_id } = snakeCaseKeys(req.body);
  try {
    const [newEnrollment] = await db('enrollments').insert(
      {
        user_id: req.user,
        course_id,
      },
      ['*'],
    );

    res.json(camelCaseKeys(newEnrollment));
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
