import {
  ACCOUNT_NUMBER,
  ALLOCATION_AMOUNT,
  POT_ID,
} from './commons/pot-orchestration.fixture';

export const buildAllocateFundsToPotCommand = (overrides = {}) => ({
  potId: POT_ID,
  accountNumber: ACCOUNT_NUMBER,
  amount: ALLOCATION_AMOUNT,
  ...overrides,
});
