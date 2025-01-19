import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { TRAINERS_SERVICE } from 'src/constants/services';
import { ClubEntity } from 'src/clubs/entities/club.entity';
import { DatabaseModule, Database } from '@app/database';
import { TrainerEntity } from './entities/trainer.entity';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { ClubsService } from 'src/clubs/clubs.service';

dotenv.config({ path: `./.env` });
@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRAINERS_SERVICE,
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
  controllers: [TrainersController],
  providers: [ClubsService, TrainersService],
})
export class TrainersModule {}
