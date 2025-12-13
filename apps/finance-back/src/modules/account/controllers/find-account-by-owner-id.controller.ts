import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindAccountByOwnerIdCommand } from '../application/commands';
import { FindAccountByOwnerIdUseCase } from '../application/use-cases';
import { Account } from '../domain/account.domain';
import { FindAccountByOwnerIdInput } from './dto';

@Controller()
export class FindAccountByOwnerIdController {
  constructor(
    private findAccountByOwnerIdUseCase: FindAccountByOwnerIdUseCase
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAccountByOwnerId(
    @Query() accountInput: FindAccountByOwnerIdInput
  ): Promise<Account> {
    const findAccountByOwnerIdCommand: FindAccountByOwnerIdCommand =
      accountInput.toCommand();
    return this.findAccountByOwnerIdUseCase.findAccountByOwnerId(
      findAccountByOwnerIdCommand
    );
  }
}
