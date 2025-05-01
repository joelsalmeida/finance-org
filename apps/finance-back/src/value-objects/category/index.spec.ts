import { Category } from './index';
import { CategoryNameType } from './index.types';
import { InvalidCategoryNameException } from './exceptions';

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
});
