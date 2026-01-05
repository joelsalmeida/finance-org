import { HttpStatus } from '@nestjs/common';
import { FUNDS_ALLOCATION_ERROR_HTTP_STATUS } from './funds-allocation-error.http-status';
import { FundsAllocationErrorCode } from './funds-allocation.error-codes';

export class HttpStatusResolver {
  static resolve(code: FundsAllocationErrorCode): HttpStatus {
    return FUNDS_ALLOCATION_ERROR_HTTP_STATUS[code];
  }
}
