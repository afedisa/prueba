import { PlayerEntity } from 'src/players/entities/player.entity';
import {
  Entity,
  Column,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Check,
} from 'typeorm';

@Entity({ name: 'clubs' })
@Check('"budget" > 0')
export class ClubEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column('int')
  budget: number;

  @OneToMany(() => PlayerEntity, (player) => player.club)
  @JoinColumn({ name: 'playerId' })
  player: PlayerEntity[];
}
