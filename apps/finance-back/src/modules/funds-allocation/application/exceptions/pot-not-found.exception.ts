import {
  FUNDS_ALLOCATION_ERROR_CODES,
  FundsAllocationException,
  MessageResolver,
} from './commons';

const CODE = FUNDS_ALLOCATION_ERROR_CODES.POT_NOT_FOUND;

export class PotNotFoundException extends FundsAllocationException {
  code = CODE;

  constructor() {
    super(MessageResolver.resolve(CODE));
  }
}
