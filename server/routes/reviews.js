const router = require('express').Router();

const db = require('../db');
const authorization = require('../middleware/auth');

const { snakeCaseKeys, camelCaseKeys } = require('../utils/formatting');

// create a card
router.post('', authorization, async (req, res) => {
  try {
    const { card_id, lesson_id } = snakeCaseKeys(req.body);
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

// get all cards
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

// // get a card
// router.get('/:card_id', authorization, async (req, res) => {
//   try {
//     const { card_id } = req.params;
//     const [card] = await db('cards').where({ card_id });
//     res.json(camelCaseKeys(card));
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json(error.message);
//   }
// });

// // update a card
// router.put('/:card_id', authorization, async (req, res) => {
//   try {
//     const { card_id } = req.params;
//     const { front, back, is_review_card, lesson_id } = req.body;
//     const [updatedCard] = await db('cards')
//       .where({ card_id })
//       .update({ front, back, is_review_card, lesson_id }, ['*']);
//     res.json(camelCaseKeys(updatedCard));
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json(error.message);
//   }
// });

// // delete a card
// router.delete('/:card_id', authorization, async (req, res) => {
//   try {
//     const { card_id } = req.params;
//     const updatedCards = await db('cards').where({ card_id }).delete(['*']);
//     res.json(updatedCards.map((card) => camelCaseKeys(card)));
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json(error.message);
//   }
// });

module.exports = router;
