import {
  TRANSFER_ERROR_CODES,
  TransferErrorCode,
} from './transfer.error-codes';

type TransferErrorMessages = Record<TransferErrorCode, string>;

export const TRANSFER_ERROR_MESSAGES: TransferErrorMessages = {
  [TRANSFER_ERROR_CODES.SOURCE_ACCOUNT_NOT_FOUND]:
    'The source account could not be found.',

  [TRANSFER_ERROR_CODES.DESTINATION_ACCOUNT_NOT_FOUND]:
    'The destination account could not be found.',
} as const;
