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
  update: {
    body: {
      email: Joi.string().email(),
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
      firstName: Joi.string()
        .min(3)
        .max(20),
      lastName: Joi.string()
        .min(3)
        .max(20),
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

export const providerValidation = {
  create: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      name: Joi.string()
        .min(6)
        .required(),
      details: Joi.string().min(6),
    },
  },
  update: {
    body: {
      email: Joi.string().email(),
      name: Joi.string().min(6),
      details: Joi.string().min(6),
    },
  },
};
