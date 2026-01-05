import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../../../../shared/exceptions/application.exception';
import { FundsAllocationErrorCode } from './funds-allocation.error-codes';
import { HttpStatusResolver } from './http-status.resolver';
import { MessageResolver } from './message-resolver';

export abstract class FundsAllocationException extends ApplicationException {
  readonly httpStatus: HttpStatus;
  readonly code: string;

  protected constructor(code: FundsAllocationErrorCode) {
    super(MessageResolver.resolve(code));

    this.code = code;
    this.name = this.constructor.name;
    this.httpStatus = HttpStatusResolver.resolve(code);
  }
}
