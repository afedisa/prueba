import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';

dotenv.config({ path: `./.env` });
console.log(process.env.RABBIT_MQ_URI);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
