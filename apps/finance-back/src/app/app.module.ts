import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { env } from 'process';
import { Dialect } from 'sequelize';
import { AuthModule } from '../modules/auth/auth.module';
import { UserEntity } from '../modules/user/infrastructure/persistence';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    RouterModule.register([
      { path: 'users', module: UserModule },
      { path: 'auth', module: AuthModule },
    ]),
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
})
export class AppModule {}
