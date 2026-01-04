import { HttpStatus } from '@nestjs/common';
import {
  TRANSFER_ERROR_CODES,
  TransferErrorCode,
} from './transfer.error-codes';

export const TRANSFER_ERROR_HTTP_STATUS: Record<TransferErrorCode, HttpStatus> =
  {
    [TRANSFER_ERROR_CODES.SOURCE_ACCOUNT_NOT_FOUND]: HttpStatus.NOT_FOUND,

    [TRANSFER_ERROR_CODES.DESTINATION_ACCOUNT_NOT_FOUND]: HttpStatus.NOT_FOUND,
  } as const;
