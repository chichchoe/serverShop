import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException, Body } from '@nestjs/common';
import { UserService } from '../user/services/user.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refreshtoken',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
      ignoreExpiration: true,
      secretOrKey: '123456',
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const user = await this.userService.findUser(payload.username);
    console.log((await user).refresh_token);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (req.body.refreshToken != (await user).refresh_token) {
      throw new UnauthorizedException();
    }
    if (new Date() > new Date((await user).expiresIn)) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
