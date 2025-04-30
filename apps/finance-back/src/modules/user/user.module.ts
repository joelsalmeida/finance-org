import { Module, Provider } from '@nestjs/common';
import { BcryptPasswordHasherService } from '../shared/infrastructure/hashing/bcrypt-password-hasher.service';
import { UserFactory } from './application/factories';
import {
  CreateUserService,
  FindUserByEmailService,
} from './application/services';
import {
  CreateUserUseCase,
  FindUserByEmailUseCase,
} from './application/use-cases';
import { CreateUserController, FindUserByEmailController } from './controllers';
import {
  UserMapper,
  UserPersistenceAdapter,
} from './infrastructure/persistence';
import { UserPersistencePort } from './ports/out/user-persistence.port';

export const UserProviders: Provider[] = [
  { provide: CreateUserUseCase, useClass: CreateUserService },
  { provide: UserPersistencePort, useClass: UserPersistenceAdapter },
  { provide: FindUserByEmailUseCase, useClass: FindUserByEmailService },
  { provide: 'UserFactory', useClass: UserFactory },
  { provide: 'PasswordHasher', useClass: BcryptPasswordHasherService },
  { provide: 'UserMapper', useClass: UserMapper },
];

@Module({
  providers: [...UserProviders],
  controllers: [CreateUserController, FindUserByEmailController],
  exports: [...UserProviders],
})
export class UserModule {}
