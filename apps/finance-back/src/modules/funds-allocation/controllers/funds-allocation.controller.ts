import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
  AllocateFundsToPotCommand,
  DeallocateFundsFromPotCommand,
  RemovePotCommand,
} from '../application/commands';
import {
  AllocateFundsToPotUseCase,
  DeallocateFundsFromPotUseCase,
  RemovePotUseCase,
} from '../application/usecases';
import {
  AllocateFundsToPotInput,
  DeallocateFundsFromPotInput,
  RemovePotInput,
} from './dtos';

@Controller()
export class FundsAllocationController {
  constructor(
    private allocateFundsToPot: AllocateFundsToPotUseCase,
    private deallocateFundsToPot: DeallocateFundsFromPotUseCase,
    private removePot: RemovePotUseCase
  ) {}

  @Patch(':potId/allocate')
  async allocate(
    @Param('potId') potId: string,
    @Body() input: AllocateFundsToPotInput
  ) {
    const command = new AllocateFundsToPotCommand(
      potId,
      input.accountNumber,
      input.amount
    );

    return this.allocateFundsToPot.execute(command);
  }

  @Patch(':potId/deallocate')
  async deallocate(
    @Param('potId') potId: string,
    @Body() input: DeallocateFundsFromPotInput
  ) {
    const command = new DeallocateFundsFromPotCommand(
      potId,
      input.accountNumber,
      input.amount
    );

    return this.deallocateFundsToPot.execute(command);
  }

  @Patch(':potId/remove')
  async remove(@Param('potId') potId: string, @Body() input: RemovePotInput) {
    const command = new RemovePotCommand(potId, input.accountNumber);

    return this.removePot.execute(command);
  }
}
