import {
  FUNDS_ALLOCATION_ERROR_CODES,
  FundsAllocationException,
  MessageResolver,
} from './commons';

const CODE = FUNDS_ALLOCATION_ERROR_CODES.ACCOUNT_NOT_FOUND;

export class AccountNotFoundException extends FundsAllocationException {
  code = CODE;

  constructor() {
    super(MessageResolver.resolve(CODE));
  }
}
