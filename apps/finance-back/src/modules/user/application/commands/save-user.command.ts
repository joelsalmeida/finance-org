export class SaveUserCommand {
  constructor(readonly rawEmail: string, readonly rawPassword: string) {}
}
