import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PLAYERS_SERVICE } from 'src/constants/services';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(`${PlayersService.name}`);
  constructor(@Inject(PLAYERS_SERVICE) private playerClient: ClientProxy) {}
  create(createPlayerDto: CreatePlayerDto) {
    return 'This action adds a new player';
  }

  async findAll() {
    console.log('findAll getPlayers');
    this.playerClient.emit('newPlayer', {
      player: 'Pepe',
      club: 'CLUB1',
    });
    return { success: true, message: 'Mensaje enviado' };
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
