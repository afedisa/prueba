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
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo entrenador',
    description: 'Este endpoint crea un nuevo entrenador en el sistema.',
  })
  create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainersService.create(createTrainerDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los entrenadores',
    description: 'Este endpoint devuelve una lista con todos los entrenadores registrados en el sistema.',
  })
  findAll() {
    return this.trainersService.findAll();
  }

  @Patch(':id/start')
  @ApiOperation({
    summary: 'Dar de alta a un entrenador',
    description: 'Este endpoint da de alta a un entrenador.',
  })
  @ApiParam({
    name: 'id', // Nombre del parámetro en la ruta
    description: 'El ID único del entrenador', // Descripción que aparecerá en Swagger
    example: 1, // Ejemplo de valor
  })
  updateStart(
    @Param('id') id: number,
    @Body() updateStartTrainerDto: UpdateStartTrainerDto,
  ) {
    return this.trainersService.updateStart(+id, updateStartTrainerDto);
  }
  @Patch(':id/end')
  @ApiOperation({
    summary: 'Dar de baja a un entrenador',
    description: 'Este endpoint da de baja a un entrenador.',
  })
  @ApiParam({
    name: 'id', // Nombre del parámetro en la ruta
    description: 'El ID único del entrenador', // Descripción que aparecerá en Swagger
    example: 1, // Ejemplo de valor
  })
  updateEnd(@Param('id') id: number) {
    return this.trainersService.updateEnd(+id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un entrenador',
    description: 'Este endpoint elimina un entrenador del sistema.',
  })
  @ApiParam({
    name: 'id', // Nombre del parámetro en la ruta
    description: 'El ID único del entrenador', // Descripción que aparecerá en Swagger
    example: 1, // Ejemplo de valor
  })
  remove(@Param('id') id: number) {
    return this.trainersService.remove(+id);
  }
}
