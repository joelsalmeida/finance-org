export class DeallocateFundsFromPotCommand {
  constructor(
    readonly potId: string,
    readonly accountNumber: string,
    readonly amount: number
  ) {}
}
