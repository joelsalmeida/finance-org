import {
  AccountTestBuilder,
  TransactionTestBuilder,
} from '../../../../../tests/builders';

const SOURCE_NUMBER = '7400-3287-7395';
const DESTINATION_NUMBER = '8057-9491-6924';
const INITIAL_SOURCE_BALANCE = 900_00;
const INITIAL_DESTINATION_BALANCE = 100_00;
const TRANSACTION_VALUE = 100_00;

export const buildTransferFixture = () => {
  const sourceAccount = new AccountTestBuilder()
    .withAccountNumber(SOURCE_NUMBER)
    .withBalance(INITIAL_SOURCE_BALANCE)
    .build();

  const destinationAccount = new AccountTestBuilder()
    .withAccountNumber(DESTINATION_NUMBER)
    .withBalance(INITIAL_DESTINATION_BALANCE)
    .build();

  const transaction = new TransactionTestBuilder()
    .withSourceAccount(SOURCE_NUMBER)
    .withDestinationAccount(DESTINATION_NUMBER)
    .withAmount(TRANSACTION_VALUE)
    .build();

  return {
    sourceAccount,
    destinationAccount,
    transaction,
  };
};

export {
  DESTINATION_NUMBER,
  INITIAL_DESTINATION_BALANCE,
  INITIAL_SOURCE_BALANCE,
  SOURCE_NUMBER,
  TRANSACTION_VALUE,
};
