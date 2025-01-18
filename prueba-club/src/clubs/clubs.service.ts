import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CLUB_SERVICE } from 'src/constants/services';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubsService {
  private readonly logger = new Logger(`Gateway${ClubsService.name}`);

  constructor(@Inject(CLUB_SERVICE) private clubClient: ClientProxy) {}

  create(createClubDto: CreateClubDto) {
    console.log('createClubDto', createClubDto);
    return 'This action adds a new club';
  }

  async findAll() {
    console.log('findAll getClubs');
    //return `This action returns all clubs`;
    await this.clubClient.emit('getClubs', { club: 'club' });
    return { success: true, message: 'Mensaje enviado' };
  }

  findOne(id: number) {
    return `This action returns a #${id} club`;
  }

  update(id: number, updateClubDto: UpdateClubDto) {
    console.log('updateClubDto', updateClubDto);
    return `This action updates a #${id} club`;
  }

  remove(id: number) {
    return `This action removes a #${id} club`;
  }
}
