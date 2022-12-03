import { IsNumber, IsOptional } from 'class-validator';

export class CreateAccountDto {
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
  updatedAt?: Date;
  @IsOptional()
  deletedAt?: Date;
}
