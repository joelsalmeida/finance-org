import { ApplicationException } from '../../../../shared/exceptions/application.exception';

export abstract class FundsAllocationException extends ApplicationException {
  protected constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
