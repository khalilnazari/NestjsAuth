import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  signIn(signInDto: SignInDto) {
    const user = this.userService.findOne(signInDto.email);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== signInDto.password) {
      throw new UnauthorizedException();
    }

    return user;
  }

  signOut() {
    return `This action returns all auth`;
  }

  refreshToken(id: number) {
    return `This action returns a #${id} auth`;
  }
}
