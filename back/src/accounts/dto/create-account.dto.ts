import { IsString, IsNumber, Min } from 'class-validator';

export class CreateAccountDto {
  @IsNumber()
  @Min(0)
  initialBalance: number;

  @IsString()
  currency: 'USD' | 'COP';

  @IsString()
  holderId: string;
}