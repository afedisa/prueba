import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateStartTrainerDto } from './dto/update-start-trainer.dto';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Post()
  create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainersService.create(createTrainerDto);
  }

  @Get()
  findAll() {
    return this.trainersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainersService.findOne(+id);
  }

  @Patch(':id/start')
  updateStart(
    @Param('id') id: number,
    @Body() updateStartTrainerDto: UpdateStartTrainerDto,
  ) {
    return this.trainersService.updateStart(+id, updateStartTrainerDto);
  }
  @Patch(':id/end')
  updateEnd(@Param('id') id: number) {
    return this.trainersService.updateEnd(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.trainersService.remove(+id);
  }
}
