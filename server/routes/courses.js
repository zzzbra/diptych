const router = require('express').Router();
const mapKeys = require('lodash/mapKeys');
const camelCase = require('lodash/camelCase');

const pool = require('../db');
const authorization = require('../middleware/auth');

const camelCaseKeys = (keyFromDb) =>
  mapKeys(keyFromDb, (_, key) => camelCase(key));

// create a course
router.post('', authorization, async (req, res) => {
  try {
    const { description } = req.body;
    const newCourse = await pool.query(
      'INSERT INTO courses (user_id, description) VALUES ($1, $2) RETURNING *',
      [req.user, description],
    );

    res.json(camelCaseKeys(newCourse.rows[0]));
  } catch (err) {
    console.error(err.message);
  }
});

// get all courses
router.get('', authorization, async (req, res) => {
  try {
    const allCourses = await pool.query(
      'SELECT * FROM courses WHERE user_id = $1',
      [req.user],
    );

    const responseBody = allCourses.rows.map((row) => camelCaseKeys(row));

    res.json(responseBody);
  } catch (err) {
    console.error(err.message);
  }
});

// get a course
router.get('/:course_id', authorization, async (req, res) => {
  try {
    const { course_id } = req.params;
    const course = await pool.query(
      'SELECT * FROM courses WHERE course_id = $1 AND user_id = $2',
      [course_id, req.user],
    );

    res.json(camelCaseKeys(course.rows[0]));
  } catch (err) {
    console.error(err.message);
  }
});

// update a course
router.put('/:course_id', authorization, async (req, res) => {
  try {
    const { course_id } = req.params;
    const { description } = req.body;
    const updatedCourse = await pool.query(
      'UPDATE courses SET description = $1 WHERE course_id = $2 AND user_id = $3 RETURNING *',
      [description, course_id, req.user],
    );

    res.json(updatedCourse.rows.map((row) => camelCaseKeys(row)));
  } catch (err) {
    console.error(err.message);
  }
});

// delete a course
router.delete('/:course_id', authorization, async (req, res) => {
  try {
    const { course_id } = req.params;
    const updatedCourses = await pool.query(
      'DELETE FROM courses WHERE course_id = $1 AND user_id = $2 RETURNING *',
      [course_id, req.user],
    );

    res.json(updatedCourses.rows.map((row) => camelCaseKeys(row)));
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
