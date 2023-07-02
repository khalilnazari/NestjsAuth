import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private saldRound: number;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    this.saldRound = 10;
  }

  async createNewUser(): Promise<any> {
    const password = await bcrypt.hash('random123', this.saldRound);

    const newUser = {
      email: 'find.one@gmail.com',
      password,
      role: 'User',
    };

    try {
      const userExist = await this.usersRepository.findOneBy({
        email: newUser.email,
      });

      if (userExist) {
        console.log('User exist', userExist);
        throw new ConflictException('User exist');
      }

      const response = await this.usersRepository.save(newUser);
      if (!response) {
        throw new NotFoundException();
      }

      return { message: `${newUser.email} is created` };
    } catch (error) {
      return error.response;
    }
  }

  async create(newUser: CreateUserDto): Promise<UpdateUserDto | any> {
    try {
      const userExist = await this.usersRepository.findOneBy({
        email: newUser.email,
      });

      if (userExist) {
        console.log('User exist', userExist);
        throw new ConflictException('User exist');
      }

      newUser.password = await bcrypt.hash(newUser.password, this.saldRound);
      const response = await this.usersRepository.save(newUser);
      if (!response) throw new NotFoundException();
      const { password, ...user } = response;
      return user;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async findAll(): Promise<User[] | any> {
    try {
      const response = await this.usersRepository.find();
      if (!response) throw new NotFoundException();
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async findOne(id: string): Promise<UpdateUserDto> {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) throw new NotFoundException();
      const { password, ...rest } = user;
      return rest;
    } catch (error) {
      return error.response;
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      if (!user) throw new NotFoundException();
      return user;
    } catch (error) {
      return error.response;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const saltOrRounds = 10;
      updateUserDto.password = await bcrypt.hash('random123', saltOrRounds);
    }

    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) throw new NotFoundException();

      const response = await this.usersRepository.save({
        id,
        ...updateUserDto,
      });

      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async remove(id: string): Promise<UpdateUserDto> {
    try {
      const user = await this.usersRepository.delete(id);
      if (!user) throw new NotFoundException();
      return { message: `User with ${id} is removed permanenlty` };
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
}
