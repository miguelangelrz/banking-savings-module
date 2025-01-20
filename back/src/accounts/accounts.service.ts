import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountDto } from './dto/create-users.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async createAccount(createAccountsDto: CreateAccountDto) {
    const accountNumber = this.generateAccountNumber()
    return this.accountsRepository.createAccount({ ...createAccountsDto, accountNumber });
  }

  async getAccountById(id: string) {
    return this.accountsRepository.findAccountById(id);
  }

  private generateAccountNumber(): string {
    return Math.random().toString().slice(2, 12); // Ejemplo simple
  }
}