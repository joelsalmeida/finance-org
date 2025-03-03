import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SaveUserUseCase } from '../../ports/in';
import { SaveUserCommand } from '../../ports/in';
import { SaveUserInput } from './save-user.input';

@Controller('save-user')
export class SaveUserController {
  constructor(private saveUserUseCase: SaveUserUseCase) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async saveUser(@Body() userInput: SaveUserInput): Promise<void> {
    const saveUserCommand: SaveUserCommand = userInput.toCommand();
    return this.saveUserUseCase.saveUser(saveUserCommand);
  }
}
