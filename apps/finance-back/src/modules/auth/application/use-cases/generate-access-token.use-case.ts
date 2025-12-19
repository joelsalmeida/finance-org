import { AuthenticateUserCommand } from '../commands';

export abstract class GenerateAccessTokenUseCase {
  abstract execute(
    command: AuthenticateUserCommand
  ): Promise<{ access_token: string }>;
}
