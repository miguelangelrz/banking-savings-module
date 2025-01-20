import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Users } from '../users/schemas/users.schema';
import { Account } from './schemas/account.schema';

@Injectable()
export class AccountsRepository {
  constructor(
    @InjectModel(Account.name) private readonly accountsModel: Model<Account>,
  ) {}

  async createAccount(accountData: Partial<Account>): Promise<Account> {
    const newAccount = new this.accountsModel(accountData);
    return newAccount.save();
  }

  async findUserAccountById(userId: string, id: string): Promise<Users | null> {
    return this.accountsModel.findOne({
      _id: id,
      holderId: userId,
      isDeleted: false,
    });
  }

  async findUserAccounts(userId: string): Promise<Array<Users> | null> {
    console.log("#userid", userId)
    return this.accountsModel.find({ holderId: userId, isDeleted: false });
  }

  async deleteUserAccount(
    userId: string,
    id: string,
  ): Promise<UpdateWriteOpResult | null> {
    return this.accountsModel.updateOne(
      { _id: id, holderId: userId },
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
    );
  }
}
