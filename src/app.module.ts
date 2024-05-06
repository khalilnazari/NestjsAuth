import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
