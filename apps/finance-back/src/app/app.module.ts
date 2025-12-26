import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SequelizeModule } from '@nestjs/sequelize';
import { env } from 'process';
import { Dialect } from 'sequelize';
import { AccountModule } from '../modules/account/account.module';
import { AccountEntity } from '../modules/account/infrastructure/persistence/account.entity';
import { AuthModule } from '../modules/auth/auth.module';
import { BudgetModule } from '../modules/budget/budget.module';
import { BudgetEntity } from '../modules/budget/infrastructure/persistence';
import { SharedModule } from '../modules/shared/shared.module';
import { TransactionEntity } from '../modules/transaction/infrastructure/persistence';
import { TransactionModule } from '../modules/transaction/transaction.module';
import { TransferModule } from '../modules/transfer/transfer.module';
import { UserEntity } from '../modules/user/infrastructure/persistence';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: env.DATABASE_DIALECT as Dialect,
      host: env.DATABASE_HOST,
      port: Number(env.DATABASE_PORT),
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE,
      models: [UserEntity, AccountEntity, TransactionEntity, BudgetEntity],
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    SharedModule,
    AuthModule,
    UserModule,
    AccountModule,
    TransactionModule,
    TransferModule,
    BudgetModule,
    RouterModule.register([
      { path: 'users', module: UserModule },
      { path: 'auth', module: AuthModule },
      { path: 'accounts', module: AccountModule },
      { path: 'transfers', module: TransferModule },
      { path: 'budgets', module: BudgetModule },
    ]),
  ],
})
export class AppModule {}
