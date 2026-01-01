import {
  MessageResolver,
  TRANSFER_ERROR_CODES,
  TransferException,
} from './commons';

const CODE = TRANSFER_ERROR_CODES.SOURCE_ACCOUNT_NOT_FOUND;

export class SourceAccountNotFoundException extends TransferException {
  code = CODE;

  constructor(readonly _accountNumber: string) {
    super(MessageResolver.resolve(CODE));
  }
}
