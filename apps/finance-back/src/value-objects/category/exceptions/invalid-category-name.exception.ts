import { ALLOWED_CATEGORY_NAMES } from '../index.types';
import { CATEGORY_INVALID_NAME } from '../../../exceptions/codes';
import { DomainBaseException } from '../../../exceptions/domain-base.exception';

export class InvalidCategoryNameException extends DomainBaseException {
  readonly code = CATEGORY_INVALID_NAME;

  constructor(categoryName: string) {
    super(
      `"${categoryName}" category name is invalid.
      Allowed categories are: ${ALLOWED_CATEGORY_NAMES.join(', ')}`
    );
  }
}
