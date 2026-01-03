import {
  AccountTestBuilder,
  PotTestBuilder,
} from '../../../../../../tests/builders';

const ACCOUNT_NUMBER = '7400-3287-7395';
const ACCOUNT_INITIAL_BALANCE = 1_000_00;
const ACCOUNT_INITIAL_RESERVED = 200_00;

const OTHER_ACCOUNT_NUMBER = '8057-9491-6924';

const POT_ID = '7440226a-3b28-411e-9e60-624874af864b';
const POT_INITIAL_ALLOCATED = 200_00;

const ALLOCATION_AMOUNT = 300_00;
const DEALLOCATION_AMOUNT = 100_00;

export const buildPotOrchestrationFixture = () => {
  const account = new AccountTestBuilder()
    .withAccountNumber(ACCOUNT_NUMBER)
    .withBalance(ACCOUNT_INITIAL_BALANCE)
    .withReservedAmount(ACCOUNT_INITIAL_RESERVED)
    .build();

  const otherAccount = new AccountTestBuilder()
    .withAccountNumber(OTHER_ACCOUNT_NUMBER)
    .withBalance(ACCOUNT_INITIAL_BALANCE)
    .withReservedAmount(ACCOUNT_INITIAL_RESERVED)
    .build();

  const pot = new PotTestBuilder()
    .withId(POT_ID)
    .withAccountNumber(ACCOUNT_NUMBER)
    .withAllocated(POT_INITIAL_ALLOCATED)
    .build();

  return {
    account,
    otherAccount,
    pot,
  };
};

export {
  ACCOUNT_INITIAL_BALANCE,
  ACCOUNT_INITIAL_RESERVED,
  ACCOUNT_NUMBER,
  ALLOCATION_AMOUNT,
  DEALLOCATION_AMOUNT,
  OTHER_ACCOUNT_NUMBER,
  POT_ID,
  POT_INITIAL_ALLOCATED,
};
