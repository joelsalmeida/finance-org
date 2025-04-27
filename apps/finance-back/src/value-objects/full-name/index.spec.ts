import { FullName } from './index';

describe('FullName value object:', () => {
  it('should throw an error if firstName is less than 2 characters', () => {
    expect(() => new FullName('J', 'Doe')).toThrow(
      'Invalid full name: _firstName must be longer than or equal to 2 characters'
    );
  });

  it('should throw an error if lastName is less than 2 characters', () => {
    expect(() => new FullName('John', 'D')).toThrow(
      'Invalid full name: _lastName must be longer than or equal to 2 characters'
    );
  });

  it('should throw an error if full name exceeds 150 characters', () => {
    const longFirstName = 'A'.repeat(75);
    const longLastName = 'B'.repeat(76);

    expect(() => new FullName(longFirstName, longLastName)).toThrow(
      'Invalid full name: full name is too long'
    );
  });

  it('should throw an error if both firstName and lastName are invalid', () => {
    expect(() => new FullName('J', 'D')).toThrow(
      'Invalid full name: _firstName must be longer than or equal to 2 characters, _lastName must be longer than or equal to 2 characters'
    );
  });

  it('should create a valid FullName instance', () => {
    const fullName = new FullName('John', 'Doe');

    expect(fullName.toValue().firstName).toBe('John');
    expect(fullName.toValue().lastName).toBe('Doe');
    expect(fullName.getFullName()).toBe('John Doe');
  });
});
