const { loginSchema, registrationSchema } = require('../utils/validators');

module.exports = (req, res, next) => {
  const { email, name, password, isTeacher } = req.body;

  if (req.path === '/register') {
    const validatedReqContents = registrationSchema.validate({
      email,
      name,
      password,
      isTeacher,
    });

    // TODO: send more meaningful validation failure message
    // if error, res.status(401).json("Error Message");
    if (validatedReqContents.error) {
      res.status(401).json(validatedReqContents.error.details[0].message);
    }
  } else if (req.path === '/login') {
    const validatedReqContents = loginSchema.validate({ email, password });

    // if error, res.status(401).json("Error Message");
    if (validatedReqContents.error) {
      res.status(401).json(validatedReqContents.error.details[0].message);
    }
  }

  next();
};
