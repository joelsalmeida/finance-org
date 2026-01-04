import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Transaction } from '../../../../transaction/domain';
import { TransferCommand } from '../../../application/commands';
import { TransferUseCase } from '../../../application/use-cases';
import { TransferExceptionFilter } from '../filters/transfer-exception.filter';
import { TransferInput } from './dto';

@Controller()
@UseFilters(TransferExceptionFilter)
export class TransferController {
  constructor(private transferUseCase: TransferUseCase) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async transfer(@Body() transferInput: TransferInput): Promise<Transaction> {
    const transferCommand: TransferCommand = transferInput.toCommand();
    return this.transferUseCase.execute(transferCommand);
  }
}
