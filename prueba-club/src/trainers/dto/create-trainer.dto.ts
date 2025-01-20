import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTrainerDto {
  @ApiProperty({
    description: 'Nombre del entrenador',
    example: 'Pep Guardiola',
    required: true,
  })
  @IsNotEmpty({ message: 'Introduzca un nombre para el entrenador' })
  @IsString({ message: 'Introduzca un nombre válido' })
  name: string;

  @ApiProperty({
    description: 'Email del entrenador',
    example: 'pep@guardiola.com',
  })
  @IsNotEmpty({ message: 'Introduzca un email para el entrenador' })
  @IsEmail()
  email: string;
}
