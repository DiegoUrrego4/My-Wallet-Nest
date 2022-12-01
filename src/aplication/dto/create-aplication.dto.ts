import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateAplicationDto {
  @IsString()
  @IsNotEmpty()
  appColorTheme: string;
  @IsBoolean()
  changed?: boolean;
}
