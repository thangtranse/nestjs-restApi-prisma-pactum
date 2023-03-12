import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppFirstModule } from './appFrist/appFrist.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    NoteModule,
    PrismaModule,
    AppFirstModule,
  ],
})
export class AppModule {}
