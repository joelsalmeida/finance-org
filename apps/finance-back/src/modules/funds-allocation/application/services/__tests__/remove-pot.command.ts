import { ACCOUNT_NUMBER, POT_ID } from './commons/pot-orchestration.fixture';

export const buildRemovePotCommand = (overrides = {}) => ({
  potId: POT_ID,
  accountNumber: ACCOUNT_NUMBER,
  ...overrides,
});
