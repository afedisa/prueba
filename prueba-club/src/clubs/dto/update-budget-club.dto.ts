import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateBudgetClubDto {
  @ApiProperty({
    description: 'Presupuesto del club',
    required: true,
  })
  @IsInt()
  @Min(1, { message: 'El presupuesto debe ser mayor a 0.' })
  budget: number;
}
