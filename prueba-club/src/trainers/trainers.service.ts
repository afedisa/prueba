import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TRAINERS_SERVICE } from 'src/constants/services';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class TrainersService {
  private readonly logger = new Logger(`Gateway${TrainersService.name}`);
  constructor(@Inject(TRAINERS_SERVICE) private trainerClient: ClientProxy) {}
  create(createTrainerDto: CreateTrainerDto) {
    return 'This action adds a new trainer';
  }

  findAll() {
    return `This action returns all trainers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainer`;
  }

  update(id: number, updateTrainerDto: UpdateTrainerDto) {
    return `This action updates a #${id} trainer`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainer`;
  }
}
