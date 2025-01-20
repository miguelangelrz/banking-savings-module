import { IsEnum, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  documentType: 'CC';

  @IsNumber()
  documentNumber: string;
  
  @IsString()
  password: string;
}