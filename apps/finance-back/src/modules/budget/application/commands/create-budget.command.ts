export class CreateBudgetCommand {
  constructor(
    readonly accountNumber: string,
    readonly category: string,
    readonly limit: number
  ) {}
}
