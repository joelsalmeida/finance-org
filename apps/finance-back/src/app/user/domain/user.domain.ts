import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class User {
  @Expose({ name: 'id' })
  private _id: string;

  @Expose({ name: 'email' })
  private _email: string;

  @Expose({ name: 'password' })
  private _password: string;

  @Expose({ name: 'createdAt' })
  private _createdAt: Date;

  @Expose({ name: 'updatedAt' })
  private _updatedAt: Date;

  constructor(
    email: string,
    password: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._email = email;
    this._password = password;
    this._id = id || uuidv4();
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  get id(): string {
    return this._id;
  }

  set id(newId: string) {
    this._id = newId;
  }

  get email(): string {
    return this._email;
  }

  set email(newEmail: string) {
    this._email = newEmail;
  }

  get password(): string {
    return this._password;
  }

  set password(newPassword: string) {
    this._password = newPassword;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(newDate: Date) {
    this._createdAt = newDate;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(newDate: Date) {
    this._updatedAt = newDate;
  }
}
