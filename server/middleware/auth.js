const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header('token');

    if (!jwtToken) {
      console.error('ERROR: NO JWT IN HEADER');
      return res.status(403).json('Unauthorized');
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = payload.user;

    next();
  } catch (error) {
    const { message } = error;
    console.error(message);
    return res.status(500).json(message);
  }
};
