import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  async createAccount(@Body() createUsersDto: CreateUserDto) {
    return this.usersService.createUser(createUsersDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.usersService.login(loginDto);
  }
}
