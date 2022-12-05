import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAplicationDto {
  @IsString()
  @IsNotEmpty()
  appColor: string;
  @IsBoolean()
  @IsOptional()
  changed?: boolean;
}
