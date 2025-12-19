import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TokenService } from '../application/services';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthenticateUserInput } from './dto/authenticate-user.input';

@Controller()
export class AuthenticateUserController {
  constructor(private readonly tokenService: TokenService) {}

  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('authenticate')
  async authenticate(@Body() authenticateUserInput: AuthenticateUserInput) {
    const authenticateUserCommand = authenticateUserInput.toCommand();

    const accessToken = await this.tokenService.execute(
      authenticateUserCommand
    );

    return accessToken;
  }
}
