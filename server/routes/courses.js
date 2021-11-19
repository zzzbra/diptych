const router = require('express').Router();

const db = require('../db');
const authorization = require('../middleware/auth');

const { snakeCaseKeys, camelCaseKeys } = require('../utils/formatting');

// create a course
router.post('', authorization, async (req, res) => {
  try {
    const { description } = req.body;
    const [newCourse] = await db('courses').insert(
      {
        user_id: req.user,
        description,
      },
      ['*'],
    );

    res.json(camelCaseKeys(newCourse));
  } catch (err) {
    console.error(err.message);
    res.status(500).json(error.message);
  }
});

// get all courses
router.get('', authorization, async (req, res) => {
  const { user_id = '' } = snakeCaseKeys(req.query);

  try {
    const allCourses = !!user_id
      ? await db('courses').where({ user_id })
      : await db('courses');
    const responseBody = allCourses.map((course) => camelCaseKeys(course));

    res.json(responseBody);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(error.message);
  }
});

// get a course
router.get('/:course_id', authorization, async (req, res) => {
  try {
    const { course_id } = req.params;
    const [course] = await db('courses').where({
      course_id,
      user_id: req.user,
    });

    res.json(camelCaseKeys(course));
  } catch (err) {
    console.error(err.message);
    res.status(500).json(error.message);
  }
});

// update a course
router.put('/:course_id', authorization, async (req, res) => {
  try {
    const { course_id } = req.params;
    const { description } = req.body;
    const [updatedCourse] = await db('courses')
      .where({
        course_id,
        user_id: req.user,
      })
      .update({ description }, ['*']);

    res.json(camelCaseKeys(updatedCourse));
  } catch (err) {
    console.error(err.message);
    res.status(500).json(error.message);
  }
});

// delete a course
router.delete('/:course_id', authorization, async (req, res) => {
  try {
    const { course_id } = req.params;
    const updatedCourses = await db('courses')
      .where({
        course_id,
        user_id: req.user,
      })
      .delete(['*']);

    res.json(updatedCourses.map((course) => camelCaseKeys(course)));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
