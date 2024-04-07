import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  signIn(authData: AuthDto) {
    return 'This action adds a new auth';
  }

  signOut(authData: AuthDto) {
    return `This action returns all auth`;
  }
}
