import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SaveUserService } from './user/application/services/seve-user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './user/adapter/out';
import { GetUserByEmailService } from './user/application/services/get-user-by-email.service';
import { GetUserByEmailUseCase } from './user/ports/in';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';
import { Dialect } from 'sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    SequelizeModule.forRoot({
      dialect: env.DATABASE_DIALECT as Dialect,
      host: env.DATABASE_HOST,
      port: Number(env.DATABASE_PORT),
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE,
      models: [UserEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SaveUserService,
    { provide: GetUserByEmailUseCase, useClass: GetUserByEmailService },
  ],
})
export class AppModule {}
