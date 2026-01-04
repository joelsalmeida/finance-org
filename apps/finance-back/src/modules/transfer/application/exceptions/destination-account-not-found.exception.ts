import { TRANSFER_ERROR_CODES, TransferException } from './commons';

const DESTINATION_ACCOUNT_NOT_FOUND =
  TRANSFER_ERROR_CODES.DESTINATION_ACCOUNT_NOT_FOUND;

export class DestinationAccountNotFoundException extends TransferException {
  constructor(readonly _accountNumber: string) {
    super(DESTINATION_ACCOUNT_NOT_FOUND);
  }
}
