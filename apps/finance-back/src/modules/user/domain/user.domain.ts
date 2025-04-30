import { Email, HashedPassword } from '../../../value-objects';

export type UserAttributes = {
  id: string;
  email: Email;
  password: HashedPassword;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  private readonly _id: string;
  private _email: Email;
  private _password: HashedPassword;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(userAttributes: UserAttributes) {
    const { id, email, password, createdAt, updatedAt } = userAttributes;

    this._id = id;
    this._email = email;
    this._password = password;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get email(): Email {
    return this._email;
  }

  get password(): HashedPassword {
    return this._password;
  }

  get createdAt(): Date {
    return new Date(this._createdAt);
  }

  get updatedAt(): Date {
    return new Date(this._updatedAt);
  }

  private touch(): void {
    this._updatedAt = new Date();
  }

  changeEmail(newEmail: Email): void {
    this._email = newEmail;
    this.touch();
  }

  changePassword(newPassword: HashedPassword): void {
    this._password = newPassword;
    this.touch();
  }
}
