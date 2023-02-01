import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/loggerMiddleware';
import { SalonService } from './salon.service';

@Global()
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SalonService],
  exports: [SalonService], // 다른 모듈에서 사용한다는 가정에서 export를 한다
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'v1', method: RequestMethod.GET });
    // .forRoutes(AppController)
  }
}

/**
 * antoher_modules...
 *
 * @Module({
 *  ...
 *  imports: [SalonService]
 * })
 */
