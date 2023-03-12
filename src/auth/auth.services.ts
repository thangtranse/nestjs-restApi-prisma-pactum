import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';

@Injectable({}) //this is "Dependency Injection"
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(authDTO: AuthDTO) {
    try {
      const password = await argon.hash(authDTO.password);
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPassword: password,
        },
        select: {
          // only select id, email, createdAt
          id: true,
          email: true,
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      if (error.code == 'P2002') {
        // throw new ForbiddenException(error.message);
        throw new ForbiddenException('User with this email already exists');
      }
      return error;
    }
  }
  async login(authDTO: AuthDTO) {
    const user = await this.prismaService.user.findUnique({
      where: { email: authDTO.email },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const checkPassword = await argon.verify(
      user.hashedPassword,
      authDTO.password,
    );
    if (!checkPassword) {
      throw new ForbiddenException('Incorrect password');
    }
    delete user.hashedPassword;
    return await this.convertToJwtString(user.id, user.email);
  }
  async convertToJwtString(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
    };
  }
}
