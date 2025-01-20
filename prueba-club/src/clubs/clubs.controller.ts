import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateBudgetClubDto } from './dto/update-budget-club.dto';
import { ClubsService } from './clubs.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los clubes',
    description:
      'Este endpoint devuelve una lista con todos los clubes registrados en el sistema.',
  })
  findAll() {
    return this.clubsService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo club',
    description: 'Este endpoint crea un nuevo club en el sistema.',
  })
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubsService.create(createClubDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar presupuesto de un club',
    description: 'Este endpoint actualiza el presupuesto de un club.',
  })
  @ApiParam({
    name: 'id', // Nombre del parámetro en la ruta
    description: 'El ID único del club', // Descripción que aparecerá en Swagger
    example: 1, // Ejemplo de valor
  })
  update(
    @Param('id') id: string,
    @Body() updateBudgetClubDto: UpdateBudgetClubDto,
  ) {
    return this.clubsService.updateBudget(+id, updateBudgetClubDto);
  }

  /*
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un club',
    description: 'Este endpoint devuelve la información de un club en el sistema.',
  })
  @ApiParam({
    name: 'id',
    description: 'El ID único del club',
    example: 1,
  })
  costesTotales(@Param('id') id: string) {
    return this.clubsService.getExpensesClub(+id);
  }
  */
}
