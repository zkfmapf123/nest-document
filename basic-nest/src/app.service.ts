import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(userAgent?: string): { [x: string]: string } {
    return {
      salonKey: 'salonKey',
      employeeKey: 'employeeKey',
      customerKey: 'customerKey',
      userAgent,
    };
  }
}
