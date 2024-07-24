import { Injectable } from '@nestjs/common';

// Serviço do endpoint home
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
