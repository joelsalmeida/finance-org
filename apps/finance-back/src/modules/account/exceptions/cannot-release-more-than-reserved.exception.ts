import { ACCOUNT_RELEASE_MORE_THAN_RESERVED } from '../../../exceptions/codes';
import { DomainBaseException } from '../../../exceptions/domain-base.exception';

export class CannotReleaseMoreThanReservedException extends DomainBaseException {
  readonly code = ACCOUNT_RELEASE_MORE_THAN_RESERVED;

  constructor() {
    super('Cannot release more than reserved balance.');
  }
}
