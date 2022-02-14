import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RefreshToken, User } from '../models/user.interface';
import {
  AuthValidator,
  LoginValidator,
  RefreshValidator,
} from '../pipe/authValidator';
import { AuthService } from '../services/auth.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body(new AuthValidator()) createdUser: User): Promise<User> {
    return this.authService.signUp(createdUser);
  }

  @Post('login')
  async login(
    @Body(new LoginValidator()) loginUser: User,
  ): Promise<{ token: string; refreshToken: string; user: User }> {
    return this.authService.login(loginUser);
  }

  @Post('/refresh-token')
  async refreshToken(@Body(new RefreshValidator()) refresh: RefreshToken) {
    return this.authService.refreshToken(refresh);
  }
}
