import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LogMiddleware } from 'src/middlewares/log.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  // Apply middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .exclude({ path: 'user', method: RequestMethod.GET })
      .forRoutes(UserController);
  }
}
