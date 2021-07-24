const Joi = require('joi');

module.exports = {
  postOrder: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9]+$/).required(),
    email: Joi.string().email().trim().required(),
    address: Joi.string().required(),
    amount: Joi.number().required(),
    items: Joi.array().items(Joi.object({
      productId: Joi.number().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required()
    })).required()
  })
}