import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRequest } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRequest])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
