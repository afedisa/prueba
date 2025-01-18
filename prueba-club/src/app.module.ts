import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ClubsModule } from './clubs/clubs.module';
import { PlayersModule } from './players/players.module';
import { TrainersModule } from './trainers/trainers.module';

dotenv.config({ path: `./.env` });

@Module({
  imports: [
    ConfigModule,
    ClubsModule,
    PlayersModule,
    TrainersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
