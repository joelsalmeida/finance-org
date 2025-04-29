import { Module, Provider } from '@nestjs/common';
import { SaveUserService, GetUserByEmailService } from './application/services';
import { SaveUserUseCase } from './application/use-cases';
import { UserPersistencePort } from './ports/out/user-persistence.port';
import { UserPersistenceAdapter } from './infrastructure/persistence';
import { UserMapper } from './infrastructure/persistence';
import { SaveUserController } from './controllers';
import { GetUserByEmailUseCase } from './application/use-cases';
import { UserFactory } from './application/factories';
import { PasswordHasher } from '../../utils';

export const UserProviders: Provider[] = [
  { provide: SaveUserUseCase, useClass: SaveUserService },
  { provide: UserPersistencePort, useClass: UserPersistenceAdapter },
  { provide: GetUserByEmailUseCase, useClass: GetUserByEmailService },
  { provide: 'UserFactory', useClass: UserFactory },
  { provide: 'PasswordHasher', useClass: PasswordHasher },
  { provide: 'UserMapper', useClass: UserMapper },
];

@Module({
  providers: [...UserProviders],
  controllers: [SaveUserController],
  exports: [...UserProviders],
})
export class UserModule {}
