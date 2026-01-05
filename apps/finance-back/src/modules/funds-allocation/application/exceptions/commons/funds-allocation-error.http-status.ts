import { HttpStatus } from '@nestjs/common';
import {
  FUNDS_ALLOCATION_ERROR_CODES,
  FundsAllocationErrorCode,
} from './funds-allocation.error-codes';

export const FUNDS_ALLOCATION_ERROR_HTTP_STATUS: Record<
  FundsAllocationErrorCode,
  HttpStatus
> = {
  [FUNDS_ALLOCATION_ERROR_CODES.ACCOUNT_NOT_FOUND]: HttpStatus.NOT_FOUND,

  [FUNDS_ALLOCATION_ERROR_CODES.POT_NOT_FOUND]: HttpStatus.NOT_FOUND,

  [FUNDS_ALLOCATION_ERROR_CODES.POT_ACCOUNT_MISMATCH]: HttpStatus.CONFLICT,
} as const;
