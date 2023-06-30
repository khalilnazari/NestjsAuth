import { PartialType } from '@nestjs/mapped-types';
import { SignInDto } from './auth.dto';

export class UpdateAuthDto extends PartialType(SignInDto) {}
