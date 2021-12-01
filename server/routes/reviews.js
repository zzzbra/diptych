const router = require('express').Router();

const { default: knex } = require('knex');
const db = require('../db');
const authorization = require('../middleware/auth');

const { snakeCaseKeys, camelCaseKeys } = require('../utils/formatting');

const DUMB_SRS_INTERVALS = [1, 3, 8, 20, 47];

// create a review
router.post('', authorization, async (req, res) => {
  try {
    const { card_id, lesson_id } = snakeCaseKeys(req.body);

    console.log('before db');
    const [newReview] = await db('reviews').insert(
      {
        student_id: req.user,
        lesson_id,
        card_id,
      },
      ['*'],
    );
    res.json(camelCaseKeys(newReview));
  } catch (error) {
    // This is a good error
    if (error.constraint === 'reviews_student_id_lesson_id_card_id_unique') {
      console.error(error.message);
      res.status(304).json('Review already exists.');
    } else {
      console.error(error.message);
      res.status(500).json(error.message);
    }
  }
});

// get all reviews
router.get('', authorization, async (req, res) => {
  try {
    const studentReviews = await db('reviews')
      .select()
      .where({ student_id: req.user });
    const responseBody = studentReviews.map((review) => camelCaseKeys(review));
    res.json(responseBody);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

// get a review
router.get('/:review_id', authorization, async (req, res) => {
  try {
    const { review_id } = req.params;
    const [review] = await db('reviews').where({ review_id });
    res.json(camelCaseKeys(review));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

// update a review
router.put('/:review_id', authorization, async (req, res) => {
  try {
    const { card_id, lesson_id, rating } = snakeCaseKeys(req.body);

    const [newReview] = await db('reviews').insert(
      {
        student_id: req.user,
        lesson_id,
        card_id,
        rating,
        due_date: db.raw(`now() + '${DUMB_SRS_INTERVALS[rating]} day'`),
      },
      ['*'],
    );
    res.json(camelCaseKeys(newReview));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

// delete a review
router.delete('/:review_id', authorization, async (req, res) => {
  try {
    const { review_id } = req.params;
    const updatedReviews = await db('reviews')
      .where({ review_id })
      .delete(['*']);
    res.json(updatedReviews.map((review) => camelCaseKeys(review)));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
