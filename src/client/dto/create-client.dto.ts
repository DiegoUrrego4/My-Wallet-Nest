import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateClientDto {
  @IsUUID()
  @IsOptional()
  id?: string = uuid();
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  phone: string;
  @IsString()
  @IsNotEmpty()
  photo: string;
}
