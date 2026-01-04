import { TransferErrorCode } from './transfer.error-codes';
import { TRANSFER_ERROR_MESSAGES } from './transfer.error-messages';

export class MessageResolver {
  static resolve(code: TransferErrorCode): string {
    return TRANSFER_ERROR_MESSAGES[code];
  }
}
