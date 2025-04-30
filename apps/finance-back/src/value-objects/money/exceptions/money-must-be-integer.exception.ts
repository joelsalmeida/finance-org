import { DomainBaseException } from '../../../exceptions/domain-base.exception';
import { MONEY_MUST_BE_INTEGER } from '../../../exceptions/codes';

export class MoneyMustBeIntegerException extends DomainBaseException {
  readonly code = MONEY_MUST_BE_INTEGER;
  constructor() {
    super('Amount must be an integer');
  }
}
