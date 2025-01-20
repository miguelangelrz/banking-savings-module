import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsController } from './accounts.controller';
import { Account, UsersSchema } from './schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: UsersSchema }]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository],
})
export class AccountsModule {}
