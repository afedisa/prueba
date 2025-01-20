import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TRAINERS_SERVICE } from 'src/constants/services';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateStartTrainerDto } from './dto/update-start-trainer.dto';
import { Database } from '@app/database';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainerEntity } from './entities/trainer.entity';
import { ClubsService } from 'src/clubs/clubs.service';

@Injectable()
export class TrainersService {
  private readonly logger = new Logger(`Gateway${TrainersService.name}`);
  constructor(
    @Inject(TRAINERS_SERVICE) private trainerClient: ClientProxy,

    @InjectRepository(TrainerEntity, Database.PRIMARY)
    private trainersRepository: Repository<TrainerEntity>,
    private clubsService: ClubsService,
  ) {}
  async create(createTrainerDto: CreateTrainerDto) {
    return await this.trainersRepository
      .save(createTrainerDto)
      .then((trainer) => {
        return trainer;
      })
      .catch((error) => {
        this.logger.error('error CreatePlayerDto create', error);
        return new HttpException(error, 500);
      });
  }

  findAll() {
    return `This action returns all trainers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainer`;
  }

  async updateStart(id: number, updateStartTrainerDto: UpdateStartTrainerDto) {
    const clubBudget = await this.clubsService.getBudgetClub(
      updateStartTrainerDto.club,
      updateStartTrainerDto.salary,
    );
    if (clubBudget < updateStartTrainerDto.salary) {
      throw new HttpException(
        'El salario del entrenador supera el presupuesto del club',
        400,
      );
    }
    const result = await this.trainersRepository
      .createQueryBuilder()
      .update(TrainerEntity)
      .set({
        salary: updateStartTrainerDto.salary,
        club: updateStartTrainerDto.club,
      })
      .where('id = :id', { id })
      .andWhere('(salary IS NULL OR salary = "")') // Condición para salario vacío o nulo
      .andWhere('(club_id IS NULL OR club_id = "")') // Condición para club vacío o nulo
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(
        `Entrenador con ID ${id} no encontrado o ya tiene salario.`,
      );
    }
    try {
      await this.clubsService.decreaseBudget(
        updateStartTrainerDto.club,
        updateStartTrainerDto.salary,
      );
    } catch (error) {
      throw new NotFoundException(
        `Club con ID ${updateStartTrainerDto.club} no ha sido actualizado.`,
      );
    }
    this.trainerClient.emit('newTrainer', {
      trainer: updateStartTrainerDto.name,
      club: updateStartTrainerDto.club,
    });
    return { id: id, affected: result.affected };
  }

  async updateEnd(id: number) {
    // Buscar el registro por ID
    const where = {};
    where['id'] = id;
    const trainer = await this.trainersRepository.findOne({
      relations: { club: true },
      where,
    });
    if (!trainer) {
      throw new NotFoundException(`Trainer con ID ${id} no encontrado.`);
    }
    // Guardar el valor anterior
    const salary = trainer.salary;
    if (trainer.salary === 0) {
      throw new NotFoundException(`Entrenador con ID ${id} no tiene salario.`);
    }
    const clubId = trainer.club.id;

    const result = await this.trainersRepository
      .createQueryBuilder()
      .update(TrainerEntity)
      .set({
        salary: 0,
        club: null,
      })
      .where('id = :id', { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Trainer con ID ${id} no encontrado.`);
    }
    try {
      await this.clubsService.increaseBudget(clubId, salary);
    } catch (error) {
      throw new NotFoundException(
        `Club con ID ${clubId} no ha sido actualizado.`,
      );
    }
    this.trainerClient.emit('endTrainer', {
      trainer: trainer.name,
      club: trainer.club.name,
    });
    return { id: id, affected: result.affected };
  }

  remove(id: number) {
    return `This action removes a #${id} trainer`;
  }
}
