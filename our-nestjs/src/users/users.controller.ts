import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id")id: string){
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}

/*
  여기까지 하면 기본적인 CRUD 기능을 수행하는 REST API 가 완성이 되는데, 당연히 실제 프로젝트에서는 제대로 된
  데이터베이스를 사용하여 데이터를 영속적으로 저장을 해야한다
  미들웨어, 파이브, 가드와 같은 NestJS에서 제공하는 부가기능도 활용할 수 있다
 */


