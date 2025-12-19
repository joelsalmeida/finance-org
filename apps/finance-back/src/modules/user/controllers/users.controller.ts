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
  CreateUserCommand,
  FindUserByEmailCommand,
} from '../application/commands';

import {
  CreateUserUseCase,
  FindUserByEmailUseCase,
} from '../application/use-cases';

import { User } from '../domain/user.domain';
import { CreateUserInput, FindUserByEmailInput } from './dto';

@Controller()
export class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findUserByEmailUseCase: FindUserByEmailUseCase
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() userInput: CreateUserInput): Promise<void> {
    const command: CreateUserCommand = userInput.toCommand();
    return this.createUserUseCase.execute(command);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findUserByEmail(
    @Query() findUserByEmailInput: FindUserByEmailInput
  ): Promise<User> {
    const findUserByEmailCommand: FindUserByEmailCommand =
      findUserByEmailInput.toCommand();
    return this.findUserByEmailUseCase.execute(findUserByEmailCommand);
  }
}
