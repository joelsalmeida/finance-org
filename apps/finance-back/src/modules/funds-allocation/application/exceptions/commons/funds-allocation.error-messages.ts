import {
  FUNDS_ALLOCATION_ERROR_CODES,
  FundsAllocationErrorCode,
} from './funds-allocation.error-codes';

type FundsAllocationErrorMessages = Record<FundsAllocationErrorCode, string>;

export const FUNDS_ALLOCATION_ERROR_MESSAGES: FundsAllocationErrorMessages = {
  [FUNDS_ALLOCATION_ERROR_CODES.POT_ACCOUNT_MISMATCH]:
    'The specified pot does not belong to the given account.',

  [FUNDS_ALLOCATION_ERROR_CODES.POT_NOT_FOUND]:
    'The selected pot does not exist.',

  [FUNDS_ALLOCATION_ERROR_CODES.ACCOUNT_NOT_FOUND]:
    'The account associated with this allocation could not be found.',
} as const;
