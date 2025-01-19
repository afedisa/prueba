import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ description: 'Nombre del jugador' })
  @IsNotEmpty({ message: 'Introduzca un nombre para el jugador' })
  @IsString({ message: 'Introduzca un nombre válido' })
  name: string;

  @ApiProperty({ description: 'Email del jugador' })
  @IsNotEmpty({ message: 'Introduzca un email para el jugador' })
  @IsEmail()
  email: string;
}
