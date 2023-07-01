import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = this.userService.findUserByEmail(signInDto.email);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== signInDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.userId, username: user.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  signOut() {
    return `This action returns all auth`;
  }

  refreshToken(id: number) {
    return `This action returns a #${id} auth`;
  }
}
