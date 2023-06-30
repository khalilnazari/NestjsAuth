import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() createAuthDto: SignInDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Post('signout')
  signOut() {
    return this.authService.signOut();
  }

  @Post('refreshtoken')
  refreshToken(@Param('id') id: string) {
    return this.authService.refreshToken(+id);
  }
}
