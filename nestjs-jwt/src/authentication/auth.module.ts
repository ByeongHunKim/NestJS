import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PrismaService } from '../prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'


@Module({
    controllers: [AuthController],
    providers:[AuthService,PrismaService,JwtStrategy,UsersService],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.EXPIRES_IN
            }
        })
    ]
})

export class AuthModule{}