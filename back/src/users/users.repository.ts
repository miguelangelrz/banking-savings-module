import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/users.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users.name) private readonly usersModel: Model<Users>) {}

  async createUser(accountData: Partial<Users>): Promise<Users> {
    const newAccount = new this.usersModel(accountData);
    return newAccount.save();
  }

  async findAccountByDNI(dni: string): Promise<Users | null> {
    return this.usersModel.findOne({ dni });
  }
}