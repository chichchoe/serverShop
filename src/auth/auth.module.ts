import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './services/auth.service';
import { JwtRefreshTokenStrategy } from './wt.refreshtoken.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: '123456',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
