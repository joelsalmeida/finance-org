import { PASSWORD_INVALID } from '../../../exceptions/codes';
import { DomainBaseException } from '../../../exceptions/domain-base.exception';

export class InvalidPasswordException extends DomainBaseException {
  readonly code = PASSWORD_INVALID;

  constructor(message?: string) {
    super(message ?? 'Invalid password.');
  }
}
