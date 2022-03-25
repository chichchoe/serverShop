import Joi from 'joi';
import { UserModel } from '../models/user.model';

export const UserSchema = Joi.object<UserModel>({
  username: Joi.string().min(6).max(50).required(),
  password: Joi.string().min(6).max(30).required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string(),
  refresh_token: Joi.string(),
  expiresIn: Joi.string(),
  createdAt: Joi.date(),
});
