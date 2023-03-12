import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // This module is used globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // other module can use
})
export class PrismaModule {}
