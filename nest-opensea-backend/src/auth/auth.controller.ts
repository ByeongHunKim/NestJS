import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';

/*
  실제로 클라이언트가 서버로부터 받은 요청을 처리하는 인터페이스 역할
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get(':address')
  async getSignMessage(@Param() params) {
    const address = params.address;

    if (!/^[0-9a-f-A-F]{40}$/.test(address)) {
      throw new HttpException('wrong address', HttpStatus.BAD_REQUEST);
    }

    const authRequest = await this.authService.generateAuthRequest(address);

    return {
      message: this.authService.generateSignatureMessage(authRequest),
      expiredAt: authRequest.expiredAt,
    };
  }
}
