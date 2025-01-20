import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-users.dto';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post('create')
  async createAccount(@Body() createUsersDto: CreateAccountDto) {
    return this.accountsService.createAccount(createUsersDto);
  }

  @Get(':id')
  async login(@Param('id') id: string) {
    return this.accountsService.getAccountById(id);
  }


}