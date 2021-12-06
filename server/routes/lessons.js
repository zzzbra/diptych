const router = require('express').Router();

const db = require('../db');
const authorization = require('../middleware/auth');

const { snakeCaseKeys, camelCaseKeys } = require('../utils/formatting');

// create a lesson
router.post('', authorization, async (req, res) => {
  try {
    const { course_id, title, description } = snakeCaseKeys(req.body);
    const [newLesson] = await db('lessons').insert(
      {
        course_id,
        title,
        description,
      },
      ['*'],
    );
    res.json(camelCaseKeys(newLesson));
  } catch (err) {
    console.error(err.message);
    res.status(500).json(error.message);
  }
});

// get all lessons (or all lessons in a course)
router.get('', authorization, async (req, res) => {
  const { course_id = '' } = snakeCaseKeys(req.query);
  console.log({ course_id });
  try {
    const allLessons = !!course_id
      ? await db('lessons').where({ course_id })
      : await db('lessons');
    res.json(allLessons.map((lesson) => camelCaseKeys(lesson)));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

// get a lesson
router.get('/:lesson_id', authorization, async (req, res) => {
  const { lesson_id } = req.params;
  try {
    const [lesson] = await db('lessons').where({ lesson_id });

    res.json(camelCaseKeys(lesson));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

// update a lesson
router.put('/:lesson_id', authorization, async (req, res) => {
  try {
    const { lesson_id } = req.params;
    const { title, description } = req.body;
    const updatedLesson = await db('lessons')
      .where({ course_id, lesson_id })
      .update({ title, description }, ['*']);
    res.json(camelCaseKeys(updatedLesson));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

// delete a lesson
router.delete('/:lesson_id', authorization, async (req, res) => {
  try {
    const { lesson_id } = req.params;
    const remainingCourses = await db('lessons')
      .where({ lesson_id })
      .delete(['*']);
    res.json(camelCaseKeys(remainingCourses));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
