import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { TRAINERS_SERVICE } from 'src/constants/services';

dotenv.config({ path: `./.env` });
@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRAINERS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_URI],
          queue: 'trainers_queue',
          persistent: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [TrainersController],
  providers: [TrainersService],
})
export class TrainersModule {}
