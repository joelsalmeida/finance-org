import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../../../../shared/infrastructure/http/dto';
import { TransferException } from '../../../application/exceptions/commons';

@Catch(TransferException)
export class TransferExceptionFilter implements ExceptionFilter {
  catch(exception: TransferException, host: ArgumentsHost) {
    const httpContext = host.switchToHttp();
    const response = httpContext.getResponse<Response<ErrorResponse>>();
    const request = httpContext.getRequest<Request>();

    const errorResponse: ErrorResponse = {
      code: exception.code,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(exception.httpStatus).json(errorResponse);
  }
}
