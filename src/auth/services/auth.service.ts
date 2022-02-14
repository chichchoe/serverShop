import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../models/user.entity';
import { RefreshToken, User } from '../models/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signUp(createdUser: User): Promise<User> {
    const { firstName, lastName, email, password } = createdUser;
    try {
      const findEmail = await this.userRepository.findOne({ where: { email } });
      if (findEmail && findEmail.id) {
        throw new HttpException(
          'A user has already been created with this email address',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const saveUser: User = await this.userRepository.save({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      delete saveUser.password;
      delete saveUser.id;
      delete saveUser.hashedRefreshToken;
      return saveUser;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOne(
        { email },
        {
          select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
        },
      );
      if (!user) {
        throw new HttpException(
          { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
          HttpStatus.FORBIDDEN,
        );
      }
      const hashPassword = await bcrypt.compare(password, user.password);
      if (hashPassword) {
        delete user.password;
        return user;
      }
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(
    user: User,
  ): Promise<{ token: string; refreshToken: string; user: User }> {
    const { email, password } = user;
    const findUser = await this.validateUser(email, password);
    if (findUser) {
      const token = await this.jwtService.signAsync({ user });
      const refreshToken = await bcrypt.hash(String(user), 12);
      return { token, refreshToken, user: findUser };
    }
  }
  async refreshToken(refresh: RefreshToken) {
    // const token = await bcrypt.compare(password, user.password)
    return '';
  }
}
