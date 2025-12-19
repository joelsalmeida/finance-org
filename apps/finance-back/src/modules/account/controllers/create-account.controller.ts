import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccountCommand } from '../application/commands';
import { CreateAccountUseCase } from '../application/use-cases';
import { CreateAccountInput } from './dto';

@Controller()
export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() accountInput: CreateAccountInput): Promise<void> {
    const createAccountCommand: CreateAccountCommand = accountInput.toCommand();
    return this.createAccountUseCase.execute(createAccountCommand);
  }
}
