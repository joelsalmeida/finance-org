import { UUID_REGEX_PATTERN } from '../../../modules/shared/domain/utils';
import { InvalidUserIdException } from './exceptions';
import { UserId } from './index';

describe('UserId', () => {
  it('"create" method creates a new UserId instance', () => {
    const userId = UserId.create();
    expect(userId instanceof UserId).toBe(true);
  });

  it('creates a new UserId instance with a valid UUID', () => {
    const userId = UserId.create();

    expect(userId instanceof UserId).toBe(true);

    expect(userId.toString()).toMatch(UUID_REGEX_PATTERN);
  });

  it('creates from valid UUID string', () => {
    const validRawUUID = 'a92a4d72-cf1d-4892-94fb-44751e8b5c2a';
    const userId = UserId.fromString(validRawUUID);

    expect(userId.toString()).toBe(validRawUUID);
  });

  it('throws on invalid UUID string', () => {
    const invalidRawUUID = 'invalid';
    expect(() => UserId.fromString(invalidRawUUID)).toThrow(
      InvalidUserIdException
    );
  });

  it('compares equality correctly', () => {
    const id = UserId.fromString('a92a4d72-cf1d-4892-94fb-44751e8b5c2a');
    const sameID = UserId.fromString('a92a4d72-cf1d-4892-94fb-44751e8b5c2a');

    const randomId = UserId.create();

    expect(id.equals(sameID)).toBe(true);

    expect(id.equals(randomId)).toBe(false);
  });
});
