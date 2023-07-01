import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private testUser: { email: string; password: string; userId: string };

  constructor() {
    this.testUser = {
      userId: '3216546546546',
      email: 'khalil@gmail.com',
      password: '321654',
    };
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return id;
  }

  findUserByEmail(email: string) {
    if (email !== this.testUser.email) {
      return null;
    }
    return this.testUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
