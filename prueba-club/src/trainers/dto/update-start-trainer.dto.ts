import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainerDto } from './create-trainer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { ClubEntity } from 'src/clubs/entities/club.entity';

export class UpdateStartTrainerDto extends PartialType(CreateTrainerDto) {
  @ApiProperty({ description: 'id del club' })
  @IsNotEmpty({ message: 'Introduzca un id del club' })
  @IsInt({ message: 'Introduzca un ide de club válido' })
  club: ClubEntity;

  @ApiProperty({
    description: 'Salario del entrenador',
    required: true,
  })
  @IsInt({ message: 'Introduzca un salario válido' })
  @Min(1, { message: 'El salario debe ser mayor a 0.' })
  salary: number;
}
