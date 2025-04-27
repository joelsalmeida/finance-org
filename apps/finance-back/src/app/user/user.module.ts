import { Module, Provider } from '@nestjs/common';
import { SaveUserService } from './application/services/seve-user.service';
import { SaveUserUseCase } from './ports/in';
import { UserPersistencePort } from './ports/out/user-persistence.port';
import { UserPersistenceAdapter } from './adapter/out';
import { UserMapper } from './adapter/out';
import { SaveUserController } from './adapter/in';
import { GetUserByEmailService } from './application/services/get-user-by-email.service';
import { GetUserByEmailUseCase } from './ports/in';
import { UserFactory } from './application/factories/user-factory';
import { PasswordHasher } from '../../utils';

export const UserProviders: Provider[] = [
  { provide: SaveUserUseCase, useClass: SaveUserService },
  { provide: UserPersistencePort, useClass: UserPersistenceAdapter },
  { provide: GetUserByEmailUseCase, useClass: GetUserByEmailService },
  { provide: 'UserFactoryInterface', useClass: UserFactory },
  { provide: 'PasswordHasherInterface', useClass: PasswordHasher },
  UserMapper,
];

@Module({
  providers: [...UserProviders],
  controllers: [SaveUserController],
  exports: [...UserProviders],
})
export class UserModule {}
