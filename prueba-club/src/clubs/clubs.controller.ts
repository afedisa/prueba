import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateBudgetClubDto } from './dto/update-budget-club.dto';
import { ClubsService } from './clubs.service';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  findAll() {
    return this.clubsService.findAll();
  }

  @Post()
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubsService.create(createClubDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBudgetClubDto: UpdateBudgetClubDto,
  ) {
    return this.clubsService.updateBudget(+id, updateBudgetClubDto);
  }

  @Get(':id')
  costesTotales(@Param('id') id: string) {
    return this.clubsService.getExpensesClub(+id);
  }
}
