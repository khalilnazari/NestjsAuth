import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/roles/roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // only admin can acccess
  @Get()
  @Auth(Roles.Admin)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/search')
  async searchUser(@Query('email') email: string) {
    const response = await this.userService.findOneByEmail(email);
    if (!response) throw new NotFoundException();
    return response;
  }

  // only user can access
  @Get(':id')
  @Auth(Roles.User)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  // anyone can access
  @Patch(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
