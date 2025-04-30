import { AUTH_INVALID_CREDENTIALS } from '../../../exceptions/codes';
import { DomainBaseException } from '../../../exceptions/domain-base.exception';

export class InvalidCredentialsException extends DomainBaseException {
  readonly code = AUTH_INVALID_CREDENTIALS;

  constructor() {
    super('Invalid email or password.');
  }
}
