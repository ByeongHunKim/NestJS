import { IsString, Length } from 'class-validator'

export class RegisterUserDto {
    @IsString()
    @Length(5,10)
    username: string

    @IsString()
    @Length(6,10)
    password: string

    @IsString()
    @Length(6,10)
    name: string

    @IsString()
    @Length(6,10)
    email: string
}