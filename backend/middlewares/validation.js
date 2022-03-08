const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validatelink = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат URL');
  }
  return value;
};

const validatyUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validatyAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validatelink).required(),
  }),
});

const validatyUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required()
      .alphanum(),
  }),
});

const validatyCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required()
      .alphanum(),
  }),
});

const validatyCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom(validatelink).required(),
  }),
});

const validatySigUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validatelink),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validatySigIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validatyUser,
  validatyAvatar,
  validatyUserId,
  validatyCardId,
  validatyCard,
  validatySigUp,
  validatySigIn,
};
