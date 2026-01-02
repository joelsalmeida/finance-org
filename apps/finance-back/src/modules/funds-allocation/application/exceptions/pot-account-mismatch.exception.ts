import {
  FUNDS_ALLOCATION_ERROR_CODES,
  FundsAllocationException,
  MessageResolver,
} from './commons';

// TODO:Apply this exception pattern to the rest of the project.
const CODE = FUNDS_ALLOCATION_ERROR_CODES.POT_ACCOUNT_MISMATCH;

export class PotAccountMismatchException extends FundsAllocationException {
  code = CODE;

  constructor() {
    super(MessageResolver.resolve(CODE));
  }
}
