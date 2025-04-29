import { Module } from '@nestjs/common';
import { AuthService } from './application/services/auth.service';
import { UserModule } from '../../modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './application/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { env } from 'process';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_EXPIRATION_IN },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
