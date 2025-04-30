import { AuthenticateUserCommand } from '../commands';

export abstract class GenerateAccessTokenUseCase {
  abstract generateAccessToken(
    command: AuthenticateUserCommand
  ): Promise<{ access_token: string }>;
}
