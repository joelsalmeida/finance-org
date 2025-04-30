import { Injectable } from '@nestjs/common';
import { GetUserByEmailCommand } from '../../../user/application/commands';
import { GetUserByEmailUseCase } from '../../../user/application/use-cases';
import { JwtPayload, TokenGeneratorPort } from '../../ports/out';
import { AuthenticateUserCommand } from '../commands';
import { GenerateAccessTokenUseCase } from '../use-cases';

@Injectable()
export class TokenService implements GenerateAccessTokenUseCase {
  constructor(
    private getUserByEmailService: GetUserByEmailUseCase,
    private tokenGenerator: TokenGeneratorPort
  ) {}

  async generateAccessToken(
    command: AuthenticateUserCommand
  ): Promise<{ access_token: string }> {
    const userFound = await this.getUserByEmailService.getUserByEmail(
      new GetUserByEmailCommand(command.email)
    );

    const jwtPayload: JwtPayload = {
      username: command.email,
      sub: userFound.id,
    };

    return {
      access_token: this.tokenGenerator.sign(jwtPayload),
    };
  }
}
