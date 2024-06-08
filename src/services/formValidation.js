const joi = require("joi");

const usernameVerification = joi.string().required().min(3).max(256);
const emailVerification = joi
  .string()
  .required()
  .min(6)
  .max(256)
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } });

const bookingValidation = (data) => {
  const bookingModelValidation = joi.object({
    username: usernameVerification,
    email: emailVerification,
  });
  return bookingModelValidation.validate(data);
};

module.exports.bookingValidation = bookingValidation;
