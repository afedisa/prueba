import { ClubEntity } from 'src/clubs/entities/club.entity';
import {
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'trainers' })
export class TrainerEntity {
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
