import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateClientDto {
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
