import { Injectable } from '@nestjs/common';

@Injectable()
export class AppFirstService {
  getHello(): string {
    return 'Hello World!';
  }
}
