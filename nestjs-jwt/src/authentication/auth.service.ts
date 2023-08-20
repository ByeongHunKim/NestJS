import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login-user.dto'
import * as bcrypt from 'bcrypt'
import { RegisterUserDto } from './dto/register-user.dto'
import { Users } from '../users/users.model'

@Injectable()
export class AuthService{

    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService) {}

    async login(loginDto: LoginDto) : Promise<any> {
        const { username, password } = loginDto

        const users = await this.prismaService.users.findUnique({
            where: {username}
        })

        if (!users) {
            throw new NotFoundException('users not found')
        }

        const validatePassword = await bcrypt.compare(password, users.password)

        if (!validatePassword) {
            throw new NotFoundException('Invalid password')
        }

        return {
            token: this.jwtService.sign({username})
        }
    }

    async register(createDto: RegisterUserDto) : Promise<any> {
        const createUsers = new Users()
        createUsers.name = createDto.name
        createUsers.email = createDto.email
        createUsers.username = createDto.username
        createUsers.password = await bcrypt.hash(createDto.password, 10)

        const user = await this.usersService.createUser(createUsers)

        return {
            token: this.jwtService.sign({username: user.username})
        }
    }
}