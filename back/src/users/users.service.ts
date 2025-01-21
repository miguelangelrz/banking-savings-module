import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async createUser(createUsersDto: CreateUserDto) {
    const { documentType, documentNumber, name, password } = createUsersDto;

    const encryptedDocumentNumber = this.cryptoService.encrypt(documentNumber);
    const encryptedName = this.cryptoService.encrypt(name);
    const encryptedPassword = this.cryptoService.encrypt(password);

    const existingUser = await this.usersRepository.findUserByDNI({
      documentType,
      documentNumber,
    });
    if (existingUser) {
      throw new ConflictException(`User already exists`);
    }

    return this.usersRepository.createUser({
      ...createUsersDto,
      documentNumber: encryptedDocumentNumber,
      name: encryptedName,
      password: encryptedPassword,
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.getUser(loginDto);
    if (!user) {
      throw new ConflictException(`Invalid credentials`);
    }

    const payload = {
      id: user._id,
      name: user.name,
      documentType: user.documentType,
      documentNumber: user.documentNumber,
      sub: user.documentNumber,
    };

    return {
      auth_token: this.jwtService.sign(payload),
    };
  }

  private async getUser(loginDto: LoginDto) {
    const encryptedDocumentNumber = this.cryptoService.encrypt(loginDto.documentNumber) 

    const user = await this.usersRepository.findUserByDNI({
      documentType: loginDto.documentType,
      documentNumber: encryptedDocumentNumber,
    });

    const password = this.cryptoService.decrypt(user.password)

    if (!user || password !== loginDto.password || user.isDeleted) {
      return null;
    }

    return user;
  }
}
