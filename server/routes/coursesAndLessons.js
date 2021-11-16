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
  try {
    const allCourses = await db('courses');
    const responseBody = allCourses.map((row) => camelCaseKeys(row));

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

// -----------------------------------------------------------------------------

// create a lesson
router.post('/:course_id/lessons', authorization, async (req, res) => {
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

// get all lessons in a given course
router.get('/:course_id/lessons', authorization, async (req, res) => {
  const { course_id } = req.params;
  try {
    const allLessons = await db('lessons').where({ course_id });
    res.json(allLessons.map((lesson) => camelCaseKeys(lesson)));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

// get a lesson in a course
router.get(
  '/:course_id/lessons/:lesson_id',
  authorization,
  async (req, res) => {
    const { course_id, lesson_id } = req.params;
    try {
      const [lesson] = await db('lessons').where({ course_id, lesson_id });

      res.json(camelCaseKeys(lesson));
    } catch (error) {
      console.error(error.message);
      res.status(500).json(error.message);
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
      const updatedLesson = await db('lessons')
        .where({ course_id, lesson_id })
        .update({ title, description }, ['*']);
      res.json(camelCaseKeys(updatedLesson));
    } catch (error) {
      console.error(error.message);
      res.status(500).json(error.message);
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
      const remainingCourses = await db('lessons')
        .where({ course_id, lesson_id })
        .delete(['*']);
      res.json(camelCaseKeys(remainingCourses));
    } catch (error) {
      console.error(error.message);
      res.status(500).json(error.message);
    }
  },
);

module.exports = router;
