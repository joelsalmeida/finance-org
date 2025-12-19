import { Module, Provider } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { UnitOfWorkPort } from '../shared/application/ports/out';
import { SequelizeUnitOfWork } from '../shared/infrastructure/persistence/uow';
import { SharedModule } from '../shared/shared.module';
import { TransactionModule } from '../transaction/transaction.module';
import { TransferService } from './application/services';
import { TransferUseCase } from './application/use-cases';
import { TransferController } from './controllers/transfer.controller';

export const TransferProviders: Provider[] = [
  { provide: TransferUseCase, useClass: TransferService },
  { provide: UnitOfWorkPort, useClass: SequelizeUnitOfWork }
];

@Module({
  imports: [SharedModule, AccountModule, TransactionModule],
  providers: [...TransferProviders],
  controllers: [TransferController],
  exports: [...TransferProviders],
})
export class TransferModule { }
