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
  CreateBudgetCommand,
  FindBudgetsByAccountNumberCommand,
} from '../application/commands';

import {
  CreateBudgetUseCase,
  FindBudgetsByAccountNumberUseCase,
} from '../application/usecases';

import { Budget } from '../domain/budget.domain';
import { CreateBudgetInput, FindBudgetByAccountNumberInput } from './dto';

@Controller()
export class BudgetsController {
  constructor(
    private createBudget: CreateBudgetUseCase,
    private findBudgetByOwnerId: FindBudgetsByAccountNumberUseCase
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() budgetInput: CreateBudgetInput): Promise<void> {
    const command: CreateBudgetCommand = budgetInput.toCommand();
    return this.createBudget.execute(command);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findByAccountNumber(
    @Query() budgetInput: FindBudgetByAccountNumberInput
  ): Promise<Budget[]> {
    const command: FindBudgetsByAccountNumberCommand = budgetInput.toCommand();
    return this.findBudgetByOwnerId.execute(command);
  }
}
