import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  CreateAccountCommand,
  FindAccountByOwnerIdCommand,
} from '../application/commands';

import {
  CreateAccountUseCase,
  FindAccountByOwnerIdUseCase,
} from '../application/use-cases';

import { Account } from '../domain/account.domain';
import { CreateAccountInput, FindAccountByOwnerIdInput } from './dto';

@Controller()
export class AccountsController {
  constructor(
    private createAccount: CreateAccountUseCase,
    private findAccountByOwnerId: FindAccountByOwnerIdUseCase
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() accountInput: CreateAccountInput): Promise<void> {
    const command: CreateAccountCommand = accountInput.toCommand();
    return this.createAccount.execute(command);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async find(
    @Query() accountInput: FindAccountByOwnerIdInput
  ): Promise<Account> {
    const command: FindAccountByOwnerIdCommand = accountInput.toCommand();
    return this.findAccountByOwnerId.execute(command);
  }
}
