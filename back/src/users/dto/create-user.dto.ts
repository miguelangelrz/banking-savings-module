import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  documentType: 'CC' | 'TI' | 'CE';

  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @IsNotEmpty()
  password: string;
}