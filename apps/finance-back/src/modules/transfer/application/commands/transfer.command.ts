export class TransferCommand {
  constructor(
    readonly sourceAccountNumber: string,
    readonly destinationAccountNumber: string,
    readonly category: string,
    readonly amount: number
  ) {}
}
