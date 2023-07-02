import { PartialType } from '@nestjs/mapped-types';
import { SignInDto } from './auth.dto';
import { IsString } from 'class-validator';

export class UpdateAuthDto extends PartialType(SignInDto) {
  @IsString()
  id: string;
}
