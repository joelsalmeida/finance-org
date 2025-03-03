import { Module, Provider } from '@nestjs/common';
import { SeveUserService } from './application/services/seve-user.service';
import { SaveUserUseCase } from './ports/in';
import { UserPersistencePort } from './ports/out/user-persistence.port';
import { UserPersistenceAdapter } from './adapter/out';
import { UserMapper } from './adapter/out';
import { SaveUserController } from './adapter/in';
import { GetUserByEmailService } from './application/services/get-user-by-email.service';
import { GetUserByEmailUseCase } from './ports/in';

export const UserProviders: Provider[] = [
  { provide: SaveUserUseCase, useClass: SeveUserService },
  { provide: UserPersistencePort, useClass: UserPersistenceAdapter },
  { provide: GetUserByEmailUseCase, useClass: GetUserByEmailService },
  UserMapper,
];

@Module({
  providers: [...UserProviders],
  controllers: [SaveUserController],
  exports: [...UserProviders],
})
export class UserModule {}
