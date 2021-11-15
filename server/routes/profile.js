const omit = require('lodash/omit');
const router = require('express').Router();

const db = require('../db');
const authorization = require('../middleware/auth');

router.get('/', authorization, async (req, res) => {
  try {
    const [user] = db.select().where({ user_id: req.user });

    res.json(omit(user, 'user_password'));
  } catch (error) {
    res.status(500).send('SERVER ERROR');
  }
});

module.exports = router;
