/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { RefreshToken, User } from '../models/user.interface';
import { AuthRequest, LoginRequest, RefreshRequest } from './authRequest';
import { authSchema, loginSchema, refreshSchema } from './authShema.joi';

export class AuthValidator implements PipeTransform<AuthRequest, User> {
  public transform(query: AuthRequest, _metadata: ArgumentMetadata): User {
    const result = authSchema.validate(query, { convert: true });
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const validUser = result.value;
    return {
      email: validUser.email,
      password: validUser.password,
      firstName: validUser.firstName,
      lastName: validUser.lastName,
    } as User;
  }
}
export class LoginValidator implements PipeTransform<LoginRequest, User> {
  public transform(query: AuthRequest, _metadata: ArgumentMetadata): User {
    const result = loginSchema.validate(query, { convert: true });
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const validUser = result.value;
    return {
      email: validUser.email,
      password: validUser.password,
    } as User;
  }
}
export class RefreshValidator
  implements PipeTransform<RefreshRequest, RefreshToken>
{
  public transform(
    query: RefreshRequest,
    _metadata: ArgumentMetadata,
  ): RefreshToken {
    const result = refreshSchema.validate(query, { convert: true });
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const validUser = result.value;
    return {
      token: validUser.token,
      refresh_token: validUser.refresh_token,
    } as RefreshToken;
  }
}
