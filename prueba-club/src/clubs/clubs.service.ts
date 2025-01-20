import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Database } from '@app/database';
import { ClubEntity } from './entities/club.entity';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateBudgetClubDto } from './dto/update-budget-club.dto';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { TrainerEntity } from 'src/trainers/entities/trainer.entity';

@Injectable()
export class ClubsService {
  private readonly logger = new Logger(`Gateway${ClubsService.name}`);

  constructor(
    @InjectRepository(ClubEntity, Database.PRIMARY)
    private clubsRepository: Repository<ClubEntity>,

    @InjectRepository(PlayerEntity, Database.PRIMARY)
    private playersRepository: Repository<PlayerEntity>,

    @InjectRepository(TrainerEntity, Database.PRIMARY)
    private trainersRepository: Repository<TrainerEntity>,
  ) {}

  async create(createClubDto: CreateClubDto) {
    return await this.clubsRepository
      .save(createClubDto)
      .then((club) => {
        return club;
      })
      .catch((error) => {
        this.logger.error('error createClubDto create', error);
        return new HttpException(error, 500);
      });
  }

  async updateBudget(id: number, updateBudgetClubDto: UpdateBudgetClubDto) {
    const currentExpenses = await this.getExpensesClub(id);
    if (currentExpenses.sumaTotal > updateBudgetClubDto.budget) {
      throw new HttpException(
        'El presupuesto no puede ser menor que los gastos actuales',
        400,
      );
    }
    return await this.clubsRepository
      .update(id, updateBudgetClubDto)
      .then((result) => {
        return { id: id, affected: result.affected };
      })
      .catch((error) => {
        this.logger.error('error clubs update', error);
        throw new HttpException(error, 500);
      });
  }

  public async findAll() {
    return await this.clubsRepository
      .find()
      .then((clubs) => {
        return clubs;
      })
      .catch((error) => {
        this.logger.error('error clubs findAll', error);
        throw new HttpException(error, 500);
      });
  }

  public async getExpensesClub(id: number): Promise<any> {
    const resultPlayers = await this.playersRepository
      .createQueryBuilder('players')
      .select('players.club_id', 'club_id')
      .addSelect('SUM(players.salary)', 'sumaTotal')
      .where('players.club_id = :id', { id })
      .getRawOne();

    const resultTrainers = await this.trainersRepository
      .createQueryBuilder('trainers')
      .select('trainers.club_id', 'club_id')
      .addSelect('SUM(trainers.salary)', 'sumaTotal')
      .where('trainers.club_id = :id', { id })
      .getRawOne();
    return {
      sumaTotal:
        Number(resultTrainers.sumaTotal) + Number(resultPlayers.sumaTotal),
    };
  }

  async getBudgetClub(club: ClubEntity, incoming: number): Promise<number> {
    return await this.clubsRepository
      .findOne({
        where: {
          id: club.id,
          budget: MoreThanOrEqual(incoming),
        },
      })
      .then((club) => {
        if (!club) {
          throw new HttpException(
            'El salario supera el presupuesto del club',
            400,
          );
        }
        return club.budget;
      })
      .catch((error) => {
        this.logger.error('error club getBudgetClub', error);
        throw new HttpException(error, 500);
      });
  }

  async increaseBudget(clubId: number, incoming: number): Promise<any> {
    // Buscar el registro por ID
    const where = {};
    where['id'] = clubId;
    const clubData = await this.clubsRepository.findOne({ where });
    if (!clubData) {
      throw new NotFoundException(`Club con ID ${clubId} no encontrado.`);
    }
    const budget = clubData.budget;
    const currentBudget = budget + incoming;

    const result = await this.clubsRepository.update(clubId, {
      budget: currentBudget,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Club con ID ${clubId} no encontrado.`);
    }
    return { id: clubId, affected: result.affected };
  }

  async decreaseBudget(club: ClubEntity, outcoming: number): Promise<any> {
    const clubId = club;
    // Buscar el registro por ID
    const where = {};
    where['id'] = clubId;
    const clubData = await this.clubsRepository.findOne({ where });
    if (!clubData) {
      throw new NotFoundException(`Club con ID ${clubId} no encontrado.`);
    }
    const budget = clubData.budget;
    const currentBudget = budget - outcoming;
    const result = await this.clubsRepository.update(clubId, {
      budget: currentBudget,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Club con ID ${clubId} no encontrado.`);
    }
    return { id: clubId, affected: result.affected };
  }
}
