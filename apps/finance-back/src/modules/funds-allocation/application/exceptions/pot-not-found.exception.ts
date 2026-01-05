import {
  FUNDS_ALLOCATION_ERROR_CODES,
  FundsAllocationException,
} from './commons';

const POT_NOT_FOUND = FUNDS_ALLOCATION_ERROR_CODES.POT_NOT_FOUND;

export class PotNotFoundException extends FundsAllocationException {
  constructor() {
    super(POT_NOT_FOUND);
  }
}
