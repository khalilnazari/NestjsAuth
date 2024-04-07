import { IsEmail, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Exclude()
  @IsString()
  password: string;

  @IsString()
  role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  message?: string;
}
