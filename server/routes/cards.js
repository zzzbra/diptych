const router = require('express').Router();

const db = require('../db');
const authorization = require('../middleware/auth');

const { snakeCaseKeys, camelCaseKeys } = require('../utils/formatting');

// create a course
router.post('', authorization, async (req, res) => {
  try {
    const {
      front,
      back,
      lesson_id,
      is_review_card = false,
    } = snakeCaseKeys(req.body);
    const [newCard] = await db('cards').insert(
      {
        front,
        back,
        lesson_id,
        is_review_card,
      },
      ['*'],
    );
    res.json(camelCaseKeys(newCard));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

// get all cards
router.get('', authorization, async (req, res) => {
  const { lesson_id = '' } = snakeCaseKeys(req.query);
  console.log('QUERY: ', snakeCaseKeys(req.query));
  try {
    const allCards = !!lesson_id
      ? await db('cards')
      : await db('cards').select().where({ lesson_id });
    const responseBody = allCards.map((card) => camelCaseKeys(card));
    res.json(responseBody);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

// get a card
router.get('/:card_id', authorization, async (req, res) => {
  try {
    const { card_id } = req.params;
    const [card] = await db('cards').where({ card_id });
    res.json(camelCaseKeys(card));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

// update a card
router.put('/:card_id', authorization, async (req, res) => {
  try {
    const { card_id } = req.params;
    const { front, back, is_review_card, lesson_id } = req.body;
    const [updatedCard] = await db('cards')
      .where({ card_id })
      .update({ front, back, is_review_card, lesson_id }, ['*']);
    res.json(camelCaseKeys(updatedCard));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

// delete a card
router.delete('/:card_id', authorization, async (req, res) => {
  try {
    const { card_id } = req.params;
    const updatedCards = await db('cards').where({ card_id }).delete(['*']);
    res.json(updatedCards.map((card) => camelCaseKeys(card)));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
