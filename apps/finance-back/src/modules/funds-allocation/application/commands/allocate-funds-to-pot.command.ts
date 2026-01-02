export class AllocateFundsToPotCommand {
  constructor(
    readonly potId: string,
    readonly accountNumber: string,
    readonly amount: number
  ) {}
}
