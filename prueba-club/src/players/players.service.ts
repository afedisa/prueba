import { ClubsService } from './../clubs/clubs.service';
import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PLAYERS_SERVICE } from 'src/constants/services';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdateStartPlayerDto } from './dto/update-start-player.dto';
import { Database } from '@app/database';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerEntity } from './entities/player.entity';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(`${PlayersService.name}`);
  constructor(
    @Inject(PLAYERS_SERVICE) private playerClient: ClientProxy,
    @InjectRepository(PlayerEntity, Database.PRIMARY)
    private playersRepository: Repository<PlayerEntity>,
    private clubsService: ClubsService,
  ) {}
  async create(createPlayerDto: CreatePlayerDto) {
    return await this.playersRepository
      .save(createPlayerDto)
      .then((player) => {
        return player;
      })
      .catch((error) => {
        this.logger.error('error CreatePlayerDto create', error);
        return new HttpException(error, 500);
      });
  }

  async findAllByProperty(clubId: number, field: string, value: string) {
    console.log('findAllByProperty', clubId, field, value);
    return this.playersRepository
      .createQueryBuilder('players')
      .where('players.club_id = :clubId', { clubId })
      .andWhere(`players.${field} = :value`, { value })
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  async updateStart(id: number, updateStartPlayerDto: UpdateStartPlayerDto) {
    const clubBudget = await this.clubsService.getBudgetClub(
      updateStartPlayerDto.club,
      updateStartPlayerDto.salary,
    );
    if (clubBudget < updateStartPlayerDto.salary) {
      throw new HttpException(
        'El salario del jugador supera el presupuesto del club',
        400,
      );
    }
    const result = await this.playersRepository
      .createQueryBuilder()
      .update(PlayerEntity)
      .set({
        salary: updateStartPlayerDto.salary,
        club: updateStartPlayerDto.club,
      })
      .where('id = :id', { id })
      .andWhere('(salary IS NULL OR salary = "")') // Condición para salario vacío o nulo
      .andWhere('(club_id IS NULL OR club_id = "")') // Condición para club vacío o nulo
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(
        `Jugador con ID ${id} no encontrado o ya tiene salario.`,
      );
    }
    try {
      await this.clubsService.decreaseBudget(
        updateStartPlayerDto.club,
        updateStartPlayerDto.salary,
      );
    } catch (error) {
      throw new NotFoundException(
        `Club con ID ${updateStartPlayerDto.club} no ha sido actualizado.`,
      );
    }
    this.playerClient.emit('newPlayer', {
      club: updateStartPlayerDto.club,
    });
    return { id: id, affected: result.affected };
  }

  async updateEnd(id: number) {
    console.log('updateStart', id);
    // Buscar el registro por ID
    const where = {};
    where['id'] = id;
    const player = await this.playersRepository.findOne({
      relations: { club: true },
      where,
    });
    if (!player) {
      throw new NotFoundException(`Player con ID ${id} no encontrado.`);
    }
    console.log('updateEnd', player);
    // Guardar el valor anterior
    const salary = player.salary;
    if (player.salary === 0) {
      throw new NotFoundException(`Jugador con ID ${id} no tiene salario.`);
    }
    const clubId = player.club.id;

    const result = await this.playersRepository
      .createQueryBuilder()
      .update(PlayerEntity)
      .set({
        salary: 0,
        club: null,
      })
      .where('id = :id', { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(
        `Jugador con ID ${id} no encontrado o ya tiene salario.`,
      );
    }
    try {
      await this.clubsService.increaseBudget(clubId, salary);
    } catch (error) {
      throw new NotFoundException(
        `Club con ID ${clubId} no ha sido actualizado.`,
      );
    }
    this.playerClient.emit('endPlayer', {
      player: player.name,
      club: player.club.name,
    });
    return { id: id, affected: result.affected };
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
