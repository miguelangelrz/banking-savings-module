import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    PassportModule,
    UsersModule,
    AccountsModule,
    CryptoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
