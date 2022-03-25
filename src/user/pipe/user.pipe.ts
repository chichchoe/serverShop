import { ArgumentMetadata, HttpException, PipeTransform } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { UserSchema } from './userSchema.joi';

export class UserValidator implements PipeTransform<UserModel> {
  public transform(query: UserModel, _metadata: ArgumentMetadata): UserModel {
    const result = UserSchema.validate(query, {
      convert: true,
    });
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new HttpException(errorMessages, 200);
    }

    const validUser = result.value;
    return {
      username: validUser.username,
      password: validUser.password,
      firstName: validUser.firstName,
      lastName: validUser.lastName,
      email: validUser.email,
    };
  }
}
