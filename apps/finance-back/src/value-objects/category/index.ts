import { InvalidCategoryNameException } from './exceptions';
import { ALLOWED_CATEGORY_NAMES, CategoryNameType } from './index.types';

export class Category {
  private static readonly ALLOWED_CATEGORIES = ALLOWED_CATEGORY_NAMES;
  private constructor(private readonly categoryName: CategoryNameType) {}

  static fromName(categoryName: CategoryNameType): Category {
    this.validate(categoryName);
    return new Category(categoryName);
  }

  /**
   * Validates that the provided `categoryName` is a valid category.
   *
   * This function performs runtime validation to ensure that the given
   * `categoryName` exists in the predefined list of allowed categories
   * (`ALLOWED_CATEGORY_NAMES`). It uses TypeScript's `asserts` keyword
   * to narrow the type of `categoryName` to `CategoryNameType` if the
   * validation passes.
   *
   * @param {string} categoryName - The category name to validate.
   * @throws {InvalidCategoryNameException} If the `categoryName` is not in the list of allowed categories.
   *
   * Runtime validation is necessary here because the input `categoryName`
   * may come from external sources (e.g., user input, API calls) that
   * cannot be statically checked by TypeScript. This ensures that only
   * valid category names are used, maintaining type safety and preventing
   * invalid data from propagating through the application.
   */
  private static validate(
    categoryName: string
  ): asserts categoryName is CategoryNameType {
    if (!this.ALLOWED_CATEGORIES.includes(categoryName as CategoryNameType)) {
      throw new InvalidCategoryNameException(categoryName);
    }
  }

  toString(): string {
    return this.categoryName;
  }

  equals(other: Category): boolean {
    return this.categoryName === other.categoryName;
  }
}
