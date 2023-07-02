import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInInfo: SignInDto) {
    return await this.authService.signIn(signInInfo);
  }

  @Post('signout')
  signOut() {
    return this.authService.signOut();
  }

  @Post('refreshtoken')
  refreshToken(@Param('id') id: string) {
    return this.authService.refreshToken(+id);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const { secret, password, ...rest } = req.user;
    return rest;
  }
}
