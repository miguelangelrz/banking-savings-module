import { IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsNumber()
  dni: string;
  
  @IsString()
  password: string;
}