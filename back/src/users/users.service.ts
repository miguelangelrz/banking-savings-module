import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUsersDto } from './dto/create-users.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(private readonly accountsRepository: UsersRepository) {}

  async createUser(createUsersDto: CreateUsersDto) {
    return this.accountsRepository.createUser(createUsersDto);
  }

  async login(loginDto: LoginDto) {
    return this.accountsRepository.findAccountByDNI(loginDto.dni);
  }
}