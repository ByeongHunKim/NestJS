import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

/*
    Explanation :

    we are importing the ConfigModule, the UsersModule and the TypeOrmModule
    we are importing the ConfigModule, UsersModule and TypeOrmModule in the imports array
    For TypeOrmModule, we are using the method forRoot() to tell NestJS that we want to use the default connection, and we define some environment variables to connect to the database.
    we will set the in the docker-compose.yml file soon.
    the synchronize option is set to true, so that the database schema is automatically updated when the application is started
*/
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
