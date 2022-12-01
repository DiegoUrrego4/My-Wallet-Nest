import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  paymentReason: string;
  @IsNumber()
  @IsNotEmpty()
  paymentAmount: number;
}
