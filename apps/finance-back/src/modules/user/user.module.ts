import { Module, Provider } from '@nestjs/common';
import { BcryptPasswordHasherService } from '../shared/infrastructure/hashing/bcrypt-password-hasher.service';
import { UserFactory } from './application/factories';
import {
  FindUserByEmailService,
  SaveUserService,
} from './application/services';
import {
  FindUserByEmailUseCase,
  SaveUserUseCase,
} from './application/use-cases';
import { FindUserByEmailController, SaveUserController } from './controllers';
import {
  UserMapper,
  UserPersistenceAdapter,
} from './infrastructure/persistence';
import { UserPersistencePort } from './ports/out/user-persistence.port';

export const UserProviders: Provider[] = [
  { provide: SaveUserUseCase, useClass: SaveUserService },
  { provide: UserPersistencePort, useClass: UserPersistenceAdapter },
  { provide: FindUserByEmailUseCase, useClass: FindUserByEmailService },
  { provide: 'UserFactory', useClass: UserFactory },
  { provide: 'PasswordHasher', useClass: BcryptPasswordHasherService },
  { provide: 'UserMapper', useClass: UserMapper },
];

@Module({
  providers: [...UserProviders],
  controllers: [SaveUserController, FindUserByEmailController],
  exports: [...UserProviders],
})
export class UserModule {}
