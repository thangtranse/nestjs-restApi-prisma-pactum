import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { MyJwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  @UseGuards(MyJwtGuard)
  // @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() request: Request, @GetUser() user: User) {
    console.log('thangtran.Object.key.request', Object.keys(request));
    console.log('thangtran.request.user', request.user);
    return user;
  }
}
