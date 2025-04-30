import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindUserByEmailCommand } from '../application/commands';
import { FindUserByEmailUseCase } from '../application/use-cases';
import { User } from '../domain/user.domain';
import { FindUserByEmailInput } from './dto';

@Controller()
export class FindUserByEmailController {
  constructor(private findUserByEmailUseCase: FindUserByEmailUseCase) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findUserByEmail(
    @Query() findUserByEmailInput: FindUserByEmailInput
  ): Promise<User> {
    const findUserByEmailCommand: FindUserByEmailCommand =
      findUserByEmailInput.toCommand();
    return this.findUserByEmailUseCase.findUserByEmail(findUserByEmailCommand);
  }
}
