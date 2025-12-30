export class CreatePotCommand {
  constructor(
    readonly accountNumber: string,
    readonly name: string,
    readonly goalAmount: number
  ) {}
}
