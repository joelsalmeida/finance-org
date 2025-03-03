export class SaveUserCommand {
  constructor(readonly email: string, readonly password: string) {}
}
