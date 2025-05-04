import { Injectable } from '@nestjs/common';
import { FindUserByEmailCommand } from '../../../user/application/commands';
import { FindUserByEmailUseCase } from '../../../user/application/use-cases';
import { JwtPayload, TokenGeneratorPort } from '../../ports/out';
import { AuthenticateUserCommand } from '../commands';
import { GenerateAccessTokenUseCase } from '../use-cases';

@Injectable()
export class TokenService implements GenerateAccessTokenUseCase {
  constructor(
    private findUserByEmailService: FindUserByEmailUseCase,
    private tokenGenerator: TokenGeneratorPort
  ) {}

  async generateAccessToken(
    command: AuthenticateUserCommand
  ): Promise<{ access_token: string }> {
    const userFound = await this.findUserByEmailService.findUserByEmail(
      new FindUserByEmailCommand(command.email)
    );

    const jwtPayload: JwtPayload = {
      username: command.email,
      sub: userFound.id.toValue(),
    };

    return {
      access_token: this.tokenGenerator.sign(jwtPayload),
    };
  }
}
