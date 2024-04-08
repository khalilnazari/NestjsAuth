import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';

export const Auth = (...roles: string[]) => {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard));
};
