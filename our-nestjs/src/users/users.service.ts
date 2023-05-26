import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  private users: Array<User> = [];
  private id = 0;

  create(createUserDto: CreateUserDto) {
    this.users.push({ id: ++this.id, ...createUserDto, createAt: new Date() });
  }

  findAll() {
    return [...this.users];
  }

  findOne(id: number) {
    const found = this.users.find((users) => users.id);
    if(!found) throw new NotFoundException();
    return found;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const found = this.findOne(id);
    this.remove(id);
    this.users.push({ ...found, ...updateUserDto, updatedAt: new Date() });
  }

  remove(id: number){
    this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
  }
}

/*
  여기서 주의깊게 볼 부분은 findOne() method 는 주어진 id 에 부합하는 데이터가 없을 경우에
  NotFoundException 예외를 던진다는 것이다.
  이 예외는 NestJS 에서 잡이서 404 Not Found 로 응답하기 때문에, 호출자에게 존재하지 않는 데이터를 요청했다고 명시적으로 알려줄 수 있다
  id 를 인자로 받는 update() 메서드와 remove() 메서드도 내부적으로 findOne() 메서드를 호출하기 때문에
  호출자에게 동일한 피드백을 줄 수 있디
*/
