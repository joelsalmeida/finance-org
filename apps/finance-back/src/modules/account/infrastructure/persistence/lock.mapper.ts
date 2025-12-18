import { Injectable } from '@nestjs/common';
import { Transaction as SequelizeTransaction } from 'sequelize';
import { LOCK_MODE } from '../../../shared/application/ports/out';

@Injectable()
export class LockMapper {
  map(lock?: LOCK_MODE) {
    switch (lock) {
      case LOCK_MODE.WRITE:
        return SequelizeTransaction.LOCK.UPDATE;
      case LOCK_MODE.READ:
        return SequelizeTransaction.LOCK.SHARE;
      default:
        return undefined;
    }
  }
}
