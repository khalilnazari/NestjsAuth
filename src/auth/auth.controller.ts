import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() AuthDto: AuthDto) {
    return this.authService.signIn(AuthDto);
  }

  @Post('signout')
  signOut(@Body() AuthDto: AuthDto) {
    return this.authService.signOut(AuthDto);
  }
}
