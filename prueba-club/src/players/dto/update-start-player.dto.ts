import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { ClubEntity } from 'src/clubs/entities/club.entity';
import { CreatePlayerDto } from './create-player.dto';

export class UpdateStartPlayerDto extends PartialType(CreatePlayerDto) {
  @ApiProperty({ description: 'id del club',
    example: 1,
    required: true,
   })
  @IsNotEmpty({ message: 'Introduzca un id del club' })
  @IsInt({ message: 'Introduzca un ide de club válido' })
  club: ClubEntity;

  @ApiProperty({
    description: 'Salario del jugador',
    example: 1000000,
    required: true,
  })
  @IsInt()
  @Min(1, { message: 'El salario debe ser mayor a 0.' })
  salary: number;
}
