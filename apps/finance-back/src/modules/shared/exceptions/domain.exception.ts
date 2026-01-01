export abstract class DomainException extends Error {
  abstract readonly code: string;

  protected constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
