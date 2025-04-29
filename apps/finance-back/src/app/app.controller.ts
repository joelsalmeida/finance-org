import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/application/services/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { GetUserByEmailInput } from '../modules/user/controllers';
import { User } from '../modules/user/domain/user.domain';
import { AuthenticateInput } from './auth/ports/in';
import { GetUserByEmailUseCase } from '../modules/user/application/use-cases';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private getUserByEmailService: GetUserByEmailUseCase
  ) {}

  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('auth/login')
  async login(
    @Body() loginInput: AuthenticateInput
  ): Promise<{ access_token: string }> {
    const loginCommand = loginInput.toCommand();
    return this.authService.generateAccessToken(loginCommand);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('profile')
  async getProfile(
    @Body() getProfileInput: GetUserByEmailInput
  ): Promise<Pick<User, 'id' | 'email'>> {
    const getUserByEmailCommand = getProfileInput.toCommand();

    const userFound = await this.getUserByEmailService.getUserByEmail(
      getUserByEmailCommand
    );

    return { id: userFound.id, email: userFound.email };
  }
}
