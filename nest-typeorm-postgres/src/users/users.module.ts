import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

/*
    Explanation :

    we are importing the TypeOrmModule and the User entity
    we are using the decorator @Module() to tell NestJS that this is a module
    we add the TypeOrmModule.forFeature([User]) to the imports array, to tell NestJS that we want to use the User entity
*/

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
