import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateClubDto {
  @ApiProperty({ description: 'Nombre del club', example: 'Club de fútbol' })
  @IsNotEmpty({ message: 'Introduzca un nombre para el club' })
  @IsString({ message: 'Introduzca un nombre válido' })
  name: string;

  @ApiProperty({
    description: 'Presupuesto del club',
    example: 1000000,
    required: true,
  })
  @IsInt()
  @Min(1, { message: 'El presupuesto debe ser mayor a 0.' })
  budget: number;
}
