import { InvalidTransactionIdException } from './exceptions';
import { TransactionId } from './index';

describe('TransactionId', () => {
  it('"create" method creates a new TransactionId instance', () => {
    const transactionId = TransactionId.create();
    expect(transactionId instanceof TransactionId).toBe(true);
  });

  it('creates a new TransactionId instance with a valid UUID', () => {
    const transactionId = TransactionId.create();

    expect(transactionId instanceof TransactionId).toBe(true);

    const UUID_REGEX_PATTERN =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    expect(transactionId.toString()).toMatch(UUID_REGEX_PATTERN);
  });

  it('creates from valid UUID string', () => {
    const validRawUUID = 'a92a4d72-cf1d-4892-94fb-44751e8b5c2a';
    const transactionId = TransactionId.fromString(validRawUUID);

    expect(transactionId.toString()).toBe(validRawUUID);
  });

  it('throws on invalid UUID string', () => {
    const invalidRawUUID = 'invalid';
    expect(() => TransactionId.fromString(invalidRawUUID)).toThrow(
      InvalidTransactionIdException
    );
  });

  it('compares equality correctly', () => {
    const id = TransactionId.fromString('a92a4d72-cf1d-4892-94fb-44751e8b5c2a');
    const sameID = TransactionId.fromString(
      'a92a4d72-cf1d-4892-94fb-44751e8b5c2a'
    );

    const randomId = TransactionId.create();

    expect(id.equals(sameID)).toBe(true);

    expect(id.equals(randomId)).toBe(false);
  });
});
