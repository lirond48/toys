const mongoose = require("mongoose");
const Joi = require('@hapi/joi');

let toysSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 99,
  },
  info: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 99999,
  },
  category: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 99,
  },
  img_url: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 99999,
  },
  price: {
    type: Number,
    required: true,
    minLength: 2,
    maxLength: 99,
  },
  date: { type: Date, default: Date.now() },
});

exports.toysModel = mongoose.model("toys", toysSchema);

const validToys = (_toys) => {
  let JoiSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string().min(2).max(99).required(),
    info: Joi.string().min(2).max(9999).required(),
    category: Joi.string().min(2).max(99).required(),
    img_url: Joi.string().min(2).max(99999).required(),
    price: Joi.number().min(2).max(99).required(),
  });

  return JoiSchema.validate(_toys);
};

exports.validToys = validToys;
