import { ClubEntity } from 'src/clubs/entities/club.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { CLUB_SERVICE } from 'src/constants/services';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { DatabaseModule, Database } from '@app/database';
import { TrainerEntity } from 'src/trainers/entities/trainer.entity';
dotenv.config({ path: `./.env` });

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CLUB_SERVICE,
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
  controllers: [ClubsController],
  providers: [ClubsService],
})
export class ClubsModule {}
