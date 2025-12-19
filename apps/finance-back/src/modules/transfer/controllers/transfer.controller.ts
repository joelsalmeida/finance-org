import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Transaction } from '../../transaction/domain';
import { TransferCommand } from '../application/commands';
import { TransferUseCase } from '../application/use-cases';
import { TransferInput } from './dto';

// TODO: Add exception filter
@Controller()
export class TransferController {
  constructor(private transferUseCase: TransferUseCase) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async transfer(@Body() transferInput: TransferInput): Promise<Transaction> {
    const transferCommand: TransferCommand = transferInput.toCommand();
    return this.transferUseCase.transfer(transferCommand)
  }
}
