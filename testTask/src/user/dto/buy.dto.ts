import { IsNotEmpty, IsNumber } from 'class-validator';

export class BuyDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
