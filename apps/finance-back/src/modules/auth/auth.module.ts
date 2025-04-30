import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from 'process';
import { BcryptPasswordHasherService } from '../shared/infrastructure/hashing/bcrypt-password-hasher.service';
import { JwtTokenGeneratorService } from '../shared/infrastructure/token/jwt-token-generator.service';
import { GetUserByEmailService } from '../user/application/services';
import { GetUserByEmailUseCase } from '../user/application/use-cases';
import {
  UserMapper,
  UserPersistenceAdapter,
} from '../user/infrastructure/persistence';
import { UserPersistencePort } from '../user/ports/out/user-persistence.port';
import { AuthenticateUserService, TokenService } from './application/services';
import { AuthenticateUserUseCase } from './application/use-cases';
import { AuthenticateUserController } from './controller/authenticate-user.controller';
import { PasswordHasherPort, TokenGeneratorPort } from './ports/out';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

export const AuthProviders: Provider[] = [
  { provide: 'UserMapper', useClass: UserMapper },
  { provide: AuthenticateUserUseCase, useClass: AuthenticateUserService },
  { provide: GetUserByEmailUseCase, useClass: GetUserByEmailService },
  { provide: PasswordHasherPort, useClass: BcryptPasswordHasherService },
  { provide: TokenGeneratorPort, useClass: JwtTokenGeneratorService },
  { provide: UserPersistencePort, useClass: UserPersistenceAdapter },
  TokenService,
  LocalStrategy,
  JwtStrategy,
];

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_EXPIRATION_IN },
    }),
  ],
  providers: [...AuthProviders],
  controllers: [AuthenticateUserController],
  exports: [...AuthProviders],
})
export class AuthModule {}
