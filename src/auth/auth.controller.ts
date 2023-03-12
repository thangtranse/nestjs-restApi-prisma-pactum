import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.services';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private authServices: AuthService) {}

  @Post('register')
  register(@Body() authDTO: AuthDTO) {
    return this.authServices.register(authDTO);
  }

  @Post('login')
  login(@Body() authDTO: AuthDTO) {
    return this.authServices.login(authDTO);
  }
}
