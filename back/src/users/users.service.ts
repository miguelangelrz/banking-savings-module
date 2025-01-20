import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

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
    const user =  await this.getUser(loginDto);    
    if (!user) {
      throw new ConflictException(`Invalid credentials`);
    }

    const payload = {
      id: user.id,
      name: user.name,
      documentType: user.documentType,
      documentNumber: user.documentNumber,
      sub: user.documentNumber,
    }

    return {
      auth_token: this.jwtService.sign(payload)
    }
  }

  private async getUser(loginDto: LoginDto) {
    const user =  await this.usersRepository.findUserByDNI({
      documentType: loginDto.documentType,
      documentNumber: loginDto.documentNumber,
    });

    if (!user || (user.password !== loginDto.password) || user.isDeleted) {
      return null
    }

    return user
  }
}
