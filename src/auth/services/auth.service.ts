import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string): Observable<unknown> {
    return from(bcrypt.hash(password, 12));
  }
  doesUserExist(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ where: { email } })).pipe(
      switchMap((user: User) => {
        return of(!!user);
      }),
    );
  }

  signUp(createdUser: User): Observable<User> {
    const { firstName, lastName, email, password } = createdUser;
    return this.doesUserExist(email).pipe(
      tap((doesUserExist: boolean) => {
        if (doesUserExist)
          throw new HttpException(
            'A user has already been created with this email address',
            HttpStatus.BAD_REQUEST,
          );
      }),
      switchMap(() => {
        return this.hashPassword(password).pipe(
          switchMap((hashedPassword: string) => {
            return from(
              this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
              }),
            ).pipe(
              map((user: User) => {
                delete user.password;
                delete user.id;
                return user;
              }),
            );
          }),
        );
      }),
    );
  }

  validateUser(email: string, password: string) {
    return from(
      this.userRepository.findOne(
        { email },
        {
          select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
        },
      ),
    ).pipe(
      switchMap((user: User) => {
        if (!user) {
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
            HttpStatus.FORBIDDEN,
          );
        }
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
          }),
        );
      }),
    );
  }

  login(user: User): Observable<object> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (User) {
          return from(this.jwtService.signAsync({ user })).pipe(
            map((token: string) => {
              return { token, user: user };
            }),
          );
        }
      }),
    );
  }
}
