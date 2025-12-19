import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserCommand } from '../application/commands';
import { CreateUserUseCase } from '../application/use-cases';
import { CreateUserInput } from './dto';

@Controller()
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() userInput: CreateUserInput): Promise<void> {
    const createUserCommand: CreateUserCommand = userInput.toCommand();
    return this.createUserUseCase.execute(createUserCommand);
  }
}
