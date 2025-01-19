import { DatabaseType } from 'typeorm';
import { Database } from '../interface/database.interface';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ClubEntity } from 'src/clubs/entities/club.entity';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { TrainerEntity } from 'src/trainers/entities/trainer.entity';

export const DATABASE_CONFIG: Record<
  Database,
  { type: DatabaseType; env: string; entities: EntityClassOrSchema[] }
> = {
  primary: {
    type: 'mysql',
    env: 'PRIMARY',
    entities: [ClubEntity, PlayerEntity, TrainerEntity],
  },
  secondary: {
    type: 'postgres',
    env: 'SECONDARY',
    entities: [ClubEntity, PlayerEntity, TrainerEntity],
  },
};
