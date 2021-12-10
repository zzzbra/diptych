const router = require('express').Router();

const { default: knex } = require('knex');
const db = require('../db');
const authorization = require('../middleware/auth');

const { snakeCaseKeys, camelCaseKeys } = require('../utils/formatting');

const DUMB_SRS_INTERVALS = [0, 1, 3, 8, 21, 52];

// create a review
router.post('', authorization, async (req, res) => {
  try {
    const reviews = req.body.map((review) => ({
      ...snakeCaseKeys(review),
      student_id: req.user,
    }));

    const newReviews = await db('reviews').insert(reviews, ['*']);
    res.json(camelCaseKeys(newReviews));
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
    const { review_id } = req.params;
    const { rating } = snakeCaseKeys(req.body);

    const [newReview] = await db('reviews')
      .where({ review_id })
      .update(
        {
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
