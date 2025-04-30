export class CreateUserCommand {
  constructor(readonly rawEmail: string, readonly rawPassword: string) {}
}
