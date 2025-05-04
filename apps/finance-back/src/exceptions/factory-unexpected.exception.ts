import { FACTORY_UNEXPECTED_ERROR } from './codes';
import { DomainBaseException } from './domain-base.exception';

export class UnexpectedFactoryException extends DomainBaseException {
  readonly code = FACTORY_UNEXPECTED_ERROR;

  constructor() {
    super('An Unexpected error occurred.');
  }
}
