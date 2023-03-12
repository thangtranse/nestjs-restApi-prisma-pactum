import { Controller, Get, Req } from '@nestjs/common';
import { AppFirstService } from './appFrist.service';
import { Request } from 'express';

@Controller('animal')
export class AppFirstController {
  constructor(private readonly appService: AppFirstService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('dog')
  findAll(@Req() request: Request): string {
    return 'This action return all dogs';
  }
}
