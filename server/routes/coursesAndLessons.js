const router = require('express').Router();

const pool = require('../db');
const authorization = require('../middleware/auth');

const { snakeCaseKeys, camelCaseKeys } = require('../utils/formatting');

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
    const allCourses = await pool.query('SELECT * FROM courses');

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

// -----------------------------------------------------------------------------

// create a lesson
router.post('/:course_id/lessons', authorization, async (req, res) => {
  try {
    const { course_id, title, description } = snakeCaseKeys(req.body);
    const newLesson = await pool.query(
      'INSERT INTO lessons (course_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [course_id, title, description],
    );
    res.json(camelCaseKeys(newLesson.rows[0]));
  } catch (err) {
    console.error(err.message);
  }
});

// get all lessons in a given course
router.get('/:course_id/lessons', authorization, async (req, res) => {
  const { course_id } = req.params;
  try {
    const allLessons = await pool.query(
      'SELECT * FROM lessons WHERE course_id = $1',
      [course_id],
    );
    res.json(allLessons.rows.map((row) => camelCaseKeys(row)));
  } catch (err) {
    console.error(err.message);
  }
});

// get a lesson in a course
router.get(
  '/:course_id/lessons/:lesson_id',
  authorization,
  async (req, res) => {
    const { course_id, lesson_id } = req.params;
    try {
      const lesson = await pool.query(
        'SELECT * FROM lessons WHERE course_id = $1 AND lesson_id = $2',
        [course_id, lesson_id],
      );
      res.json(camelCaseKeys(lesson.rows[0]));
    } catch (err) {
      console.error(err.message);
    }
  },
);

// update a lesson
router.put(
  '/:course_id/lessons/:lesson_id',
  authorization,
  async (req, res) => {
    try {
      const { course_id, lesson_id } = req.params;
      const { title, description } = req.body;
      const updatedCourse = await pool.query(
        'UPDATE lessons SET (title, description) = ($1, $2) WHERE course_id = $3 AND lesson_id = $4 RETURNING *',
        [title, description, course_id, lesson_id],
      );
      res.json(updatedCourse.rows.map((row) => camelCaseKeys(row)));
    } catch (err) {
      console.error(err.message);
    }
  },
);

// delete a course
router.delete(
  '/:course_id/lessons/:lesson_id',
  authorization,
  async (req, res) => {
    try {
      const { course_id, lesson_id } = req.params;
      const updatedCourses = await pool.query(
        'DELETE FROM lessons WHERE course_id = $1 AND lesson_id = $2 RETURNING *',
        [course_id, lesson_id],
      );
      res.json(updatedCourses.rows.map((row) => camelCaseKeys(row)));
    } catch (err) {
      console.error(err.message);
    }
  },
);

module.exports = router;
