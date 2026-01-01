import { TRANSFER_ERROR_MESSAGES } from './transfer.error-messages';

export class MessageResolver {
  static resolve(code: keyof typeof TRANSFER_ERROR_MESSAGES): string {
    return TRANSFER_ERROR_MESSAGES[code];
  }
}
