import { Module, Provider } from '@nestjs/common';
import {
  SequelizeModule,
  getConnectionToken,
} from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { SequelizeUnitOfWork } from './infrastructure/persistence/uow';

const SharedProviders: Provider[] = [
  {
    provide: SequelizeUnitOfWork,
    useFactory: (sequelize: Sequelize) =>
      new SequelizeUnitOfWork(sequelize),
    inject: [getConnectionToken()],
  },
];

@Module({
  imports: [
    SequelizeModule.forFeature([]),
  ],
  providers: [...SharedProviders],
  exports: [...SharedProviders],
})
export class SharedModule { }
