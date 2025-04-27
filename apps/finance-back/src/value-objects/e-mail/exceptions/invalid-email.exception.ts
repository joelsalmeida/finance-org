import { EMAIL_INVALID } from '../../../exceptions/codes';
import { DomainBaseException } from '../../../exceptions/domain-base.exception';

export class InvalidEmailException extends DomainBaseException {
  readonly code = EMAIL_INVALID;

  constructor(message?: string) {
    super(message ?? 'Invalid email.');
  }
}
