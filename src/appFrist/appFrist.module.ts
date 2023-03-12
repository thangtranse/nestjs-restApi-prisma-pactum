import { Module } from '@nestjs/common';
import { AppFirstController } from './appFrist.controller';
import { AppFirstService } from './appFrist.service';

@Module({
  controllers: [AppFirstController],
  providers: [AppFirstService],
})
export class AppFirstModule {}
