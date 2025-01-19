import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateTrainerDto {
  @ApiProperty({ description: 'Nombre del entrenador' })
  @IsNotEmpty({ message: 'Introduzca un nombre para el entrenador' })
  @IsString({ message: 'Introduzca un nombre válido' })
  name: string;

  @ApiProperty({ description: 'Email del entrenador' })
  @IsNotEmpty({ message: 'Introduzca un email para el entrenador' })
  @IsEmail()
  email: string;

}
