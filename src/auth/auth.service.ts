import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(authData: SignInDto) {
    try {
      const user = await this.userService.findUserByEmail(authData.email);

      if (!user) {
        throw new NotFoundException();
      }

      const passwordMatch = await bcrypt.compare(
        authData.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new UnauthorizedException();
      }

      const payload = {
        id: user.id,
        username: user.email,
        secret: jwtConstants.secret,
        role: user.role,
      };

      const acsessToken = await this.jwtService.signAsync(payload);

      return { acsessToken };
    } catch (error) {
      console.log('signin error : ', error);
      return error.response;
    }
  }

  signOut() {
    return `This action returns all auth`;
  }

  refreshToken(id: number) {
    return `This action returns a #${id} auth`;
  }
}
