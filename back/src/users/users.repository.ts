import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async createUser(userData: Partial<Users>): Promise<Users> {
    const newAccount = new this.usersModel(userData);
    return newAccount.save();
  }

  async findUserByDNI({
    documentType,
    documentNumber,
  }: {
    documentType: 'CC' | 'TI' | 'CE';
    documentNumber: string;
  }): Promise<Users | null> {
    return this.usersModel.findOne({ documentType, documentNumber });
  }
}
