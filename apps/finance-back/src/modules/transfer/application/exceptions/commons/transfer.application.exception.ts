import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../../../../shared/exceptions/application.exception';
import { HttpStatusResolver } from './http-status.resolver';
import { MessageResolver } from './message.resolver';
import { TransferErrorCode } from './transfer.error-codes';

export abstract class TransferException extends ApplicationException {
  readonly httpStatus: HttpStatus;
  readonly code: string;

  protected constructor(code: TransferErrorCode) {
    super(MessageResolver.resolve(code));

    this.code = code;
    this.name = this.constructor.name;
    this.httpStatus = HttpStatusResolver.resolve(code);
  }
}
