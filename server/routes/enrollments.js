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
        student_id: req.user,
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

router.delete('/withdraw/:courseId', authorization, async (req, res) => {
  const { course_id } = snakeCaseKeys(req.params);
  try {
    const enrollments = await db('enrollments')
      .where({ course_id })
      .delete(['*']);

    res.json(enrollments.map((enrollment) => enrollment.course_id));
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

router.get('', authorization, async (req, res) => {
  const { student_id = '' } = snakeCaseKeys(req.query);
  try {
    const enrollments = !!student_id
      ? await db('enrollments').where({ student_id }).select()
      : await db('enrollments').select();
    res.json(enrollments.map((enrollment) => camelCaseKeys(enrollment)));
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

module.exports = router;
