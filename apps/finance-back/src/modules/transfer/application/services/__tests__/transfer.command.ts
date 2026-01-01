import {
  DESTINATION_NUMBER,
  SOURCE_NUMBER,
  TRANSACTION_VALUE,
} from './transfer.fixture';

export const buildTransferCommand = (overrides = {}) => ({
  sourceAccountNumber: SOURCE_NUMBER,
  destinationAccountNumber: DESTINATION_NUMBER,
  amount: TRANSACTION_VALUE,
  category: 'Education',
  ...overrides,
});
