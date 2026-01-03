import {
  ACCOUNT_NUMBER,
  DEALLOCATION_AMOUNT,
  POT_ID,
} from './commons/pot-orchestration.fixture';

export const buildDeallocateFundsFromPotCommand = (overrides = {}) => ({
  potId: POT_ID,
  accountNumber: ACCOUNT_NUMBER,
  amount: DEALLOCATION_AMOUNT,
  ...overrides,
});
