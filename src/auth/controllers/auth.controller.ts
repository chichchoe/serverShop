import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { AuthValidator, LoginValidator } from '../pipe/authValidator';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body(new AuthValidator()) createdUser: User,
  ): Promise<Observable<User>> {
    return this.authService.signUp(createdUser);
  }

  @Post('login')
  async login(@Body(new LoginValidator()) loginUser: User) {
    return this.authService.login(loginUser);
  }
}
