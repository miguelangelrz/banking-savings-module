import {  IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  documentType: 'CC';

  @IsString()
  documentNumber: string;
  
  @IsString()
  password: string;
}