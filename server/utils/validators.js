const Joi = require('joi');

const registrationSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2 }).min(5),
  // TODO: move to shared location between client & server
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@]{3,30}$')).required(),
  // TODO: handle repeat password validation as well
  // repeatPassword: 'password',
  isTeacher: Joi.boolean(),
});

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).min(5),
  // TODO: move to shared location between client & server
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9@ ]{3,30}$'))
    .required(),
});

module.exports = {
  registrationSchema,
  loginSchema,
};
