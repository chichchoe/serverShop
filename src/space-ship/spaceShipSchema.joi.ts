import Joi from 'joi';

export const captainSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().max(20).optional(),
}).options({ abortEarly: false, allowUnknown: true });

export const spaceShipSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().max(20).required(),
  onMission: Joi.boolean().required(),
  dateCreated: Joi.date().required(),
  captain: captainSchema.required(),
}).options({ abortEarly: false, allowUnknown: true });
