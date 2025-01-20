import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdateStartPlayerDto } from './dto/update-start-player.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo jugador',
    description: 'Este endpoint crea un nuevo jugador en el sistema.',
  })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get(':clubId/:field/:value')
  @ApiOperation({
    summary: 'Buscar jugadores por campo',
    description:
      'Este endpoint busca jugadores en un club, por un campo específico.',
  })
  @ApiParam({ name: 'clubId', description: 'El ID único del club', example: 1 })
  @ApiParam({
    name: 'field',
    description: 'Campo sobre el que se quiere hacer la búsqueda',
    example: 'name',
  })
  @ApiParam({
    name: 'value',
    description: 'El valor que se quiere buscar',
    example: 'Leo Messi',
  })
  findAllBy(
    @Param('clubId') id: number,
    @Param('field') field: string,
    @Param('value') value: string,
  ) {
    return this.playersService.findAllByProperty(+id, field, value);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un jugador',
    description:
      'Este endpoint devuelve la información de un jugador en el sistema.',
  })
  @ApiParam({
    name: 'id', // Nombre del parámetro en la ruta
    description: 'El ID único del jugador', // Descripción que aparecerá en Swagger
    example: 1, // Ejemplo de valor
  })
  findOne(@Param('id') id: number) {
    return this.playersService.findOne(+id);
  }

  @Patch(':id/start')
  @ApiOperation({
    summary: 'Dar de alta a un jugador',
    description: 'Este endpoint da de alta a un jugador.',
  })
  @ApiParam({
    name: 'id', // Nombre del parámetro en la ruta
    description: 'El ID único del jugador', // Descripción que aparecerá en Swagger
    example: 1, // Ejemplo de valor
  })
  updateStart(
    @Param('id') id: number,
    @Body() updateStartPlayerDto: UpdateStartPlayerDto,
  ) {
    return this.playersService.updateStart(+id, updateStartPlayerDto);
  }
  @Patch(':id/end')
  @ApiOperation({
    summary: 'Dar de baja a un jugador',
    description: 'Este endpoint da de baja a un jugador.',
  })
  @ApiParam({
    name: 'id', // Nombre del parámetro en la ruta
    description: 'El ID único del jugador', // Descripción que aparecerá en Swagger
    example: 1, // Ejemplo de valor
  })
  updateEnd(@Param('id') id: number) {
    return this.playersService.updateEnd(+id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un jugador',
    description: 'Este endpoint elimina un jugador del sistema.',
  })
  @ApiParam({
    name: 'id', // Nombre del parámetro en la ruta
    description: 'El ID único del jugador', // Descripción que aparecerá en Swagger
    example: 1, // Ejemplo de valor
  })
  remove(@Param('id') id: number) {
    return this.playersService.remove(+id);
  }
}
