import { InvalidCategoryNameException } from './exceptions';
import { Category } from './index';
import { CategoryNameType } from './index.types';

describe('Category', () => {
  it('throws an error when creating a Category with an invalid category name', () => {
    expect(() =>
      Category.fromName('InvalidCategory' as CategoryNameType)
    ).toThrow(InvalidCategoryNameException);
  });

  it('creates a Category instance from a valid category name', () => {
    const category = Category.fromName('Entertainment');

    expect(category.toString()).toBe('Entertainment');
  });

  it('should return true when comparing two categories with the same name', () => {
    const category = Category.fromName('General');
    const sameCategory = Category.fromName('General');

    expect(category.equals(sameCategory)).toBe(true);
  });

  it('should return false when comparing two categories with different names', () => {
    const category = Category.fromName('General');
    const differentCategory = Category.fromName('Groceries');

    expect(category.equals(differentCategory)).toBe(false);
  });
});
