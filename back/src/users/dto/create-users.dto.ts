import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  documentType: 'CC';

  @IsString()
  documentNumber: string;

  @IsStrongPassword()
  password: string;
}