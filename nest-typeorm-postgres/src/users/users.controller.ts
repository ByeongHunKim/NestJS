import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

/*
    Explanation :

    @Controller('users') : to tell NestJS that this is a controller, and that the route is "users"

    we are defining the constructor of the class, and injecting the UserService
    we are defining 5 methods
        1. findAll
        2. findOne
        3. create
        4. update
        5. delete
    decorated with the HTTP method we want to use, and we are using the UserService to call the corresponding method
*/

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // get user by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User dose not exist!');
    } else {
      return user;
    }
  }

  // create user
  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<any> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    // handle error if user does not exist
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.userService.delete(id);
  }
}
