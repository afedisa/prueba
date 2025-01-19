import { ClubEntity } from 'src/clubs/entities/club.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'players' })
export class PlayerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: 0 })
  salary: number;

  @ManyToOne(() => ClubEntity, (club) => club.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'club_id' })
  club: ClubEntity;
}
