import { TRANSFER_ERROR_CODES, TransferException } from './commons';

const SOURCE_ACCOUNT_NOT_FOUND = TRANSFER_ERROR_CODES.SOURCE_ACCOUNT_NOT_FOUND;

export class SourceAccountNotFoundException extends TransferException {
  constructor(readonly _accountNumber: string) {
    super(SOURCE_ACCOUNT_NOT_FOUND);
  }
}
