import Joi from 'joi';

export const userValidation = {
  create: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
        .required(),
      firstName: Joi.string()
        .min(3)
        .max(20)
        .required(),
      lastName: Joi.string()
        .min(3)
        .max(20)
        .required(),
    },
  },
  login: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    },
  },
};

export const expenseValidation = {};
