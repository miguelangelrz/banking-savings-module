import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async createAccount(holderId: string, createAccountsDto: CreateAccountDto) {
    const accountNumber = this.generateAccountNumber();
    const encryptedAlias = createAccountsDto.alias?.length
      ? this.cryptoService.encrypt(createAccountsDto.alias)
      : null;
    const encryptedAccountNumber = this.cryptoService.encrypt(accountNumber);

    const accountData = {
      ...createAccountsDto,
      holderId,
      accountNumber: encryptedAccountNumber,
      alias: encryptedAlias,
    };

    return this.accountsRepository.createAccount(accountData);
  }

  async getUserAccountById(userId: string, id: string) {
    try {
      const account = await this.accountsRepository.findUserAccountById(
        userId,
        id,
      );
      if (!account) {
        throw new NotFoundException('Not found');
      }

      account.alias = this.cryptoService.decrypt(account.alias);
      account.accountNumber = this.cryptoService.decrypt(account.accountNumber);

      return account;
    } catch (e) {
      throw new NotFoundException('Not found');
    }
  }

  async getUserAccounts(userId: string) {
    try {
      const accounts = await this.accountsRepository.findUserAccounts(userId);


      const decrypted =  accounts.map((a) => {return({
        ...a.toObject(),
        alias: Boolean(a.alias) ? this.cryptoService.decrypt(a.alias) : null,
        accountNumber: this.cryptoService.decrypt(a.accountNumber),
      })});

      return decrypted;
    } catch (e) {
      throw new BadRequestException('Invalid identifier');
    }
  }

  async deleteUserAccount(userId: string, id: string) {
    try {
      const account = await this.accountsRepository.findUserAccountById(
        userId,
        id,
      );
      if (!account) {
        throw new NotFoundException();
      }

      const result = await this.accountsRepository.deleteUserAccount(
        userId,
        id,
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  generateAccountNumber(): string {
    return Math.random().toString().slice(2, 12); // Ejemplo simple
  }
}
