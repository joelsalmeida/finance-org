import { FULL_NAME_IS_TOO_LONG } from '../../../exceptions/codes';
import { DomainBaseException } from '../../../exceptions/domain-base.exception';

export class FullNameIsTooLongException extends DomainBaseException {
  readonly code = FULL_NAME_IS_TOO_LONG;

  constructor() {
    super('Invalid full name: full name is too long');
  }
}
