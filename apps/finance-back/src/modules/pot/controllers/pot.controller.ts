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
  CreatePotCommand,
  FindPotsByAccountNumberCommand,
} from '../application/commands';

import {
  CreatePotUseCase,
  FindPotsByAccountUseCase,
} from '../application/usecases';

import { Pot } from '../domain/pot.domain';
import { CreatePotInput, FindPotByAccountNumberInput } from './dto';

export class AllocateFundsToPotInput {
  amount: number;
}

@Controller()
export class PotsController {
  constructor(
    private createPot: CreatePotUseCase,
    private findPotsByAccount: FindPotsByAccountUseCase
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() potInput: CreatePotInput): Promise<void> {
    const command: CreatePotCommand = potInput.toCommand();
    return this.createPot.execute(command);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findByAccountNumber(
    @Query() accountNumber: FindPotByAccountNumberInput
  ): Promise<Pot[]> {
    const command: FindPotsByAccountNumberCommand = accountNumber.toCommand();
    return this.findPotsByAccount.execute(command);
  }
}
