import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() AuthDto: AuthDto) {
    return await this.authService.signIn(AuthDto);
  }

  @Post('/signout')
  async signOut(@Req() req: Request) {
    return await this.authService.signOut(req.headers.authorization);
  }
}
