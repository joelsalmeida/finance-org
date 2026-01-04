import { HttpStatus } from '@nestjs/common';
import { TRANSFER_ERROR_HTTP_STATUS } from './transfer-error.http-status';
import { TransferErrorCode } from './transfer.error-codes';

export class HttpStatusResolver {
  static resolve(code: TransferErrorCode): HttpStatus {
    return TRANSFER_ERROR_HTTP_STATUS[code];
  }
}
