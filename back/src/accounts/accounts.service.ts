import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async createAccount(holderId: string, createAccountsDto: CreateAccountDto) {
    const accountNumber = this.generateAccountNumber();
    const accountData = {
      ...createAccountsDto,
      holderId,
      accountNumber,
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

      return account;
    } catch (e) {
      throw new NotFoundException('Not found');
    }
  }

  async getUserAccounts(userId: string) {
    try {
      const accounts = await this.accountsRepository.findUserAccounts(userId);
      return accounts;
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
        throw new NotFoundException('Not found');
      }

      const result = await this.accountsRepository.deleteUserAccount(
        userId,
        id,
      );
      return result;
    } catch (e) {
      throw new BadRequestException('Invalid identifier');
    }
  }

  private generateAccountNumber(): string {
    return Math.random().toString().slice(2, 12); // Ejemplo simple
  }
}
