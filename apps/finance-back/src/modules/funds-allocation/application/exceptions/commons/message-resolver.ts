import { FundsAllocationErrorCode } from './funds-allocation.error-codes';
import { FUNDS_ALLOCATION_ERROR_MESSAGES } from './funds-allocation.error-messages';

export class MessageResolver {
  static resolve(code: FundsAllocationErrorCode): string {
    return FUNDS_ALLOCATION_ERROR_MESSAGES[code];
  }
}
