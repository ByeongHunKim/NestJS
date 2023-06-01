import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get(':address')
  async getSignMessage(@Param('address') address: string) {
    if (!/^[0-9a-fA-F]{40}$/.test(address)) {
      throw new HttpException('wrong address', HttpStatus.BAD_REQUEST);
    }
    console.log('address', address);

    const authRequest = await this.authService.generateAuthRequest(address);

    return {
      message: this.authService.generateSignatureMessage(authRequest),
      expiredAt: authRequest.expiredAt,
    };
  }
}
