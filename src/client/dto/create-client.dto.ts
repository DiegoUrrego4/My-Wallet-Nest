import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsUUID,
  Length,
} from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateClientDto {
  @IsUUID()
  @IsOptional()
  id?: string = uuid();
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Length(10)
  @MaxLength(10)
  @IsOptional()
  phone?: string;
  @IsString()
  @IsNotEmpty()
  picture: string;
}
