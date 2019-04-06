import { Controller, Post, Body, Get, Req } from '@nestjs/common';

import { UserResponseObject } from 'src/modules/users/user.dto';

import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() data: AuthDto): Promise<UserResponseObject> {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: AuthDto): Promise<UserResponseObject> {
    return await this.authService.login(data);
  }

  @Get('me')
  async me(@Req() req): Promise<UserResponseObject> {
    return await this.authService.me(req.headers.authorization);
  }

  @Get('access_token')
  async accessToken(@Req() req): Promise<any> {
    return await this.authService.getNewAccessToken(req.headers.authorization);
  }
}
