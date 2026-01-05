import {
  FUNDS_ALLOCATION_ERROR_CODES,
  FundsAllocationException,
} from './commons';

// TODO:Apply this exception pattern to the rest of the project.
const POT_ACCOUNT_MISMATCH = FUNDS_ALLOCATION_ERROR_CODES.POT_ACCOUNT_MISMATCH;

export class PotAccountMismatchException extends FundsAllocationException {
  constructor() {
    super(POT_ACCOUNT_MISMATCH);
  }
}
