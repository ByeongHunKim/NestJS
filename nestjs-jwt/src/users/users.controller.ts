import { UsersService } from './users.service'
import { Request, Response } from 'express'
import { Controller, Req, Res, Get } from '@nestjs/common'

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getAllUsers(@Req() request: Request, @Res() response: Response) : Promise<any> {
        try {
            const result = await this.userService.getAllUser()
            return response.status(200).json({
                status: 'ok',
                message: 'Successfully fetch data!',
                result: result
            })
        } catch(err) {
            return response.status(500).json({
                status: 'ok',
                message: 'Internal Server Error'
            })
        }
    }
}