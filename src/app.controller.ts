import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/services/auth.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UserValidator } from './user/pipe/user.pipe';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Body(new UserValidator()) createUserDto: CreateUserDto) {
    return this.authService.authLogin(createUserDto);
  }

  @UseGuards(AuthGuard('jwt-refreshtoken'))
  @Post('auth/refreshtoken')
  async refreshToken(@Request() req) {
    // NOTE req.user is the user that has been authenticated
    return await this.authService.authRefreshtoken(req.user);
  }
}
