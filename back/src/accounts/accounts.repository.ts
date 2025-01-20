import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../users/schemas/users.schema';
import { Account } from './schemas/account.schema';

@Injectable()
export class AccountsRepository {
  constructor(@InjectModel(Account.name) private readonly accountsModel: Model<Account>) {}

  async createAccount(accountData: Partial<Account>): Promise<Account> {
    const newAccount = new this.accountsModel(accountData);
    return newAccount.save();
  }

  async findAccountById(id: string): Promise<Users | null> {
    return this.accountsModel.findById(id);
  }
}