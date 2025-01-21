import { IsString, IsNumber, Min, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @MinLength(3)
  alias: string;

  @IsString()
  @IsNotEmpty()
  accountType: 'savings' | 'current';

  @IsString()
  @IsNotEmpty()
  currency: 'USD' | 'COP' | 'EUR';
}