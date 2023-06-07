import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This is return all movie';
  }

  /*
    http://localhost:3000/movies/search?year=2000 <- 처럼 year 같은 query argument를 보내고싶은경우
    search 부분이 Get보다 밑에 있으면 nestjs는 search를 id로 판단한다
  */
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  /*
    parameter의 decorator를 사용하면, nestjs는 네가 url에 있는 id parameter를 원하는 걸 알거야
    파라미터의 아래 두 가지 값이 모두 같아야하며 마지막 값은 달라도 된다
  */
  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `This will return one movie with the id : ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    console.log('movieData', movieData);
    return movieData;
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  /*
    Put은 모든 리소스를 업데이트한다
    Patch는 리소스의 일부분만 업데이트해준다
  */
  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
