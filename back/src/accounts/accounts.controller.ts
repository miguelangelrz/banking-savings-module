import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAccount(@Req() req, @Body() createUsersDto: CreateAccountDto) {
    return this.accountsService.createAccount(req.user.userId, createUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getAccountById(@Req() req, @Param('id') id: string) {
    return this.accountsService.getUserAccountById(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAccounts(@Req() req) {
    return this.accountsService.getUserAccounts(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAccount(@Req() req, @Param('id') id: string) {
    return this.accountsService.deleteUserAccount(req.user.userId, id);
  }
}