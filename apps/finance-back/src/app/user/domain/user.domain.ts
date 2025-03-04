import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

export class User {
  @Expose({ name: 'id' })
  private readonly _id: string;

  @Expose({ name: 'email' })
  private _email: string;

  @Expose({ name: 'password' })
  private _password: string;

  @Expose({ name: 'createdAt' })
  private readonly _createdAt: Date;

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

  get email(): string {
    return this._email;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static hashPassword(password: string): string {
    const SALT_ROUNDS = 10;
    const SALT = bcrypt.genSaltSync(SALT_ROUNDS);

    const hashedPassword = bcrypt.hashSync(password, SALT);
    return hashedPassword;
  }

  /**
   * Returns the hashed password (for mapping purposes only).
   */
  getHashedPassword(): string {
    return this._password;
  }

  updateEmail(newEmail: string): void {
    this._email = newEmail;
    this.touch();
  }

  updatePassword(newPassword: string): void {
    this._password = bcrypt.hashSync(newPassword, 10);
    this.touch();
  }

  async validatePassword(plainTextPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, this._password);
  }

  private touch(): void {
    this._updatedAt = new Date();
  }
}
