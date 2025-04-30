import { PasswordHasherPort } from '../../modules/auth/ports/out';
import { HashedPassword } from './index';

const HASHED_PASSWORD_VALUE = 'HASHED_PASSWORD';
const PLAIN_TEXT_PASSWORD = 'PLAIN_TEXT_PASSWORD';

describe('HashedPassword', () => {
  let hashedPassword: HashedPassword;

  beforeEach(() => {
    hashedPassword = new HashedPassword(HASHED_PASSWORD_VALUE);
  });

  const passwordHasherMock: PasswordHasherPort = {
    hash: jest.fn().mockReturnValue(HASHED_PASSWORD_VALUE),
    matches: jest.fn().mockReturnValue(true),
  };

  it('should store the hashed password value', () => {
    expect(hashedPassword.toValue()).toBe(HASHED_PASSWORD_VALUE);
  });

  it('should compare the plain text password with the hashed password using the password hasher', async () => {
    (passwordHasherMock.matches as jest.Mock).mockResolvedValue(true);

    const compareResult = await hashedPassword.matches(
      PLAIN_TEXT_PASSWORD,
      passwordHasherMock
    );

    expect(passwordHasherMock.matches).toHaveBeenCalledWith(
      PLAIN_TEXT_PASSWORD,
      hashedPassword
    );

    expect(compareResult).toBe(true);
  });

  it('should return false if the password hasher validation fails', async () => {
    (passwordHasherMock.matches as jest.Mock).mockResolvedValue(false);

    const compareResult = await hashedPassword.matches(
      'wrongPassword',
      passwordHasherMock
    );

    expect(passwordHasherMock.matches).toHaveBeenCalledWith(
      'wrongPassword',
      hashedPassword
    );

    expect(compareResult).toBe(false);
  });
});
