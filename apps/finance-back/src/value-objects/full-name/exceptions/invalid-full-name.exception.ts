import { FULL_NAME_INVALID } from '../../../exceptions/codes';
import { DomainBaseException } from '../../../exceptions/domain-base.exception';

export class InvalidFullNameException extends DomainBaseException {
  readonly code = FULL_NAME_INVALID;

  constructor(message?: string) {
    super(message ?? 'Invalid full name');
  }
}
