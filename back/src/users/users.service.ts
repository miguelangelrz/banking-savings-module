import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUsersDto: CreateUserDto) {
    const { documentType, documentNumber } = createUsersDto;

    const existingUser = await this.usersRepository.findUserByDNI({
      documentType,
      documentNumber,
    });
    if (existingUser) {
      throw new ConflictException(`User already exists`);
    }

    return this.usersRepository.createUser(createUsersDto);
  }

  async login(loginDto: LoginDto) {
    return this.usersRepository.findUserByDNI({
      documentType: loginDto.documentType,
      documentNumber: loginDto.documentNumber,
    });
  }
}
