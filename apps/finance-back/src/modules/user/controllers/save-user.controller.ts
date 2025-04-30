import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SaveUserCommand } from '../application/commands';
import { SaveUserUseCase } from '../application/use-cases';
import { SaveUserInput } from './dto/save-user.input';

@Controller()
export class SaveUserController {
  constructor(private saveUserUseCase: SaveUserUseCase) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async saveUser(@Body() userInput: SaveUserInput): Promise<void> {
    const saveUserCommand: SaveUserCommand = userInput.toCommand();
    return this.saveUserUseCase.save(saveUserCommand);
  }
}
