import { IsNumber, IsOptional } from 'class-validator';

export class CreateAccountDto {
  id: string;
  @IsNumber()
  balance?: string;
  @IsNumber()
  credit?: string;
  @IsNumber()
  @IsOptional()
  state?: number;
  @IsOptional()
  createdAt?: Date;
  @IsOptional()
  updatedAt?: Date | null;
  @IsOptional()
  deletedAt?: Date | null;
}
