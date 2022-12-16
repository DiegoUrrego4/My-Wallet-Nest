import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';
export class CreateMovementDto {
  @IsUUID()
  @IsOptional()
  movementId?: string = uuid();
  @IsString()
  @IsNotEmpty()
  idIncome: string;
  @IsString()
  @IsNotEmpty()
  idOutcome: string;
  @IsString()
  @IsNotEmpty()
  reason: string;
  @IsString()
  @IsNotEmpty()
  amount: string;
  @IsOptional()
  fees?: number;
}
