import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { UserModel } from 'src/user/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async authLogin(user: UserModel) {
    try {
      const infoUser = await this.usersService.login(
        user.username,
        user.password,
      );
      if (infoUser) {
        const payload = { ...infoUser, sub: infoUser.id };
        return {
          accessToken: this.jwtService.sign(payload),
          refreshToken: await this.generateRefreshToken(infoUser.id),
        };
      }
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async authRefreshtoken(user: UserModel) {
    try {
      const infoUser = await this.usersService.findUser(user.username);
      if (infoUser) {
        const payload = { ...infoUser, sub: infoUser.id };
        return {
          accessToken: this.jwtService.sign(payload),
          refreshToken: await this.generateRefreshToken(infoUser.id),
        };
      }
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async generateRefreshToken(userId): Promise<string> {
    const refreshToken = 'abcdefghijklmnopqrstuvwxyz1234567890';
    const expirydate = new Date();
    expirydate.setDate(expirydate.getDate() + 6);
    await this.usersService.saveOrUpdateRefreshToken(
      refreshToken,
      userId,
      expirydate,
    );
    return refreshToken;
  }
}
