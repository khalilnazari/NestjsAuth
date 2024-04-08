import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { PayloadType, SignErrorType } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    authData: AuthDto,
  ): Promise<{ access_token: string } | SignErrorType> {
    try {
      // check if user exist
      const user = await this.userService.findOneByEmail(authData.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // compare password
      const passwordMatched = await bcrypt.compare(
        authData.password,
        user.password,
      );

      if (!passwordMatched) {
        throw new UnauthorizedException('Password does not match');
      }

      delete user.password;
      const payload: PayloadType = {
        email: user.email,
        id: user.id,
        role: user.role,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  signOut(token: string) {
    // TODO: black list the token upon logout
  }
}
