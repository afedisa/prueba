import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PLAYERS_SERVICE } from 'src/constants/services';
import { ClubEntity } from 'src/clubs/entities/club.entity';
import { DatabaseModule, Database } from '@app/database';
import { PlayerEntity } from './entities/player.entity';
import { ClubsService } from 'src/clubs/clubs.service';
import { ClubsController } from 'src/clubs/clubs.controller';
import { TrainerEntity } from 'src/trainers/entities/trainer.entity';

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
    DatabaseModule.register(Database.PRIMARY),
    DatabaseModule.forEntity(Database.PRIMARY, [
      ClubEntity,
      PlayerEntity,
      TrainerEntity,
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [PlayersController],
  providers: [ClubsService, PlayersService],
})
export class PlayersModule {}
