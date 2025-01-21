import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsController } from './accounts.controller';
import { Account, UsersSchema } from './schemas/account.schema';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: UsersSchema }]),
    CryptoModule
  ],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository, JwtStrategy],
})
export class AccountsModule {}
