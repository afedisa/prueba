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

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get(':clubId/:field/:value')
  findAllBy(
    @Param('clubId') id: number,
    @Param('field') field: string,
    @Param('value') value: string,
  ) {
    return this.playersService.findAllByProperty(+id, field, value);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.playersService.findOne(+id);
  }

  @Patch(':id/start')
  updateStart(
    @Param('id') id: number,
    @Body() updateStartPlayerDto: UpdateStartPlayerDto,
  ) {
    return this.playersService.updateStart(+id, updateStartPlayerDto);
  }
  @Patch(':id/end')
  updateEnd(@Param('id') id: number) {
    return this.playersService.updateEnd(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.playersService.remove(+id);
  }
}
