import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { DonggyuDto } from './app.dto';
import { AppService } from './app.service';
import { UserAgent } from './middlewares/requestDecorator';
import { SalonService } from './salon.service';

@Controller('v1')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly salonService: SalonService,
  ) {}

  @Get()
  @HttpCode(200)
  getHello(@UserAgent() userAgent: string): { [x: string]: string } {
    return this.appService.getHello(userAgent);
  }

  /**
   * @desc
   * Pattern matching api
   */
  @Get('*donggyu')
  @Header('Content-Type', 'applicatoin/json')
  @HttpCode(200)
  allDonggyu() {
    return 'donggyu';
  }

  /**
   * @desc
   * Redirect
   */
  @Get('bad')
  @HttpCode(200)
  @Redirect('http://localhost:3000/v1/gooddonggyu')
  badUrl() {}

  @Post('salon')
  @HttpCode(200)
  getSalon(
    @Body()
    donggyu: any,
  ): any {
    const dto = new DonggyuDto(donggyu);
    const descDto = dto.toDict();
    console.log('[SERIALIZE] : ', dto);
    console.log('[DESERIALIZE] : ', descDto);
    return descDto;
  }

  @Get('salonV2')
  resSalon(@Res() res: Response) {
    res.status(HttpStatus.OK).json(null);
  }
}
