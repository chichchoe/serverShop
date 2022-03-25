import Joi from 'joi';
import { CommodityModel } from '../models/commodity.model';

export const CommoditySchema = Joi.object<CommodityModel>({
  color: Joi.string().required(),
  department: Joi.string(),
  productName: Joi.string().required(),
  price: Joi.number().required(),
  productAdjective: Joi.string(),
  productMaterial: Joi.string(),
  productDescription: Joi.string(),
  product: Joi.string().required(),
});
export const CommodityUpdateSchema = Joi.object<CommodityModel>({
  color: Joi.string(),
  department: Joi.string(),
  productName: Joi.string(),
  price: Joi.number(),
  productAdjective: Joi.string(),
  productMaterial: Joi.string(),
  productDescription: Joi.string(),
  product: Joi.string(),
});
