import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PLAYERS_SERVICE } from 'src/constants/services';

dotenv.config({ path: `./.env` });

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PLAYERS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_URI],
          queue: 'notifications_queue',
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
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
