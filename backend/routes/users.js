const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers, getUser, getActualUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getActualUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^((http|https):\/\/)?[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,5}(\/[a-zA-Z0-9-_.~:/?#[\]@!$&'()*+,;=]*)?$/),
  }),
}), updateAvatar);

module.exports = router;
