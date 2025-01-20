import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  currency: 'USD' | 'COP';
}