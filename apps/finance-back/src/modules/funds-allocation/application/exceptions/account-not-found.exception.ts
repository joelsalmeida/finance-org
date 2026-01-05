import {
  FUNDS_ALLOCATION_ERROR_CODES,
  FundsAllocationException,
} from './commons';

const ACCOUNT_NOT_FOUND = FUNDS_ALLOCATION_ERROR_CODES.ACCOUNT_NOT_FOUND;

export class AccountNotFoundException extends FundsAllocationException {
  constructor() {
    super(ACCOUNT_NOT_FOUND);
  }
}
