import { FUNDS_ALLOCATION_ERROR_MESSAGES } from './funds-allocation.error-messages';

type FundsAllocationErrorMessage = keyof typeof FUNDS_ALLOCATION_ERROR_MESSAGES;

export class MessageResolver {
  static resolve(code: FundsAllocationErrorMessage): string {
    return FUNDS_ALLOCATION_ERROR_MESSAGES[code];
  }
}
