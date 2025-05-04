import { DomainBaseException } from '../../../../exceptions';

/**
 * Represents the successful output of a factory operation.
 *
 * @template T - The type of the result data.
 * @property {true} success - Indicates the operation was successful.
 * @property {T} data - The result data of the factory operation.
 */
export type FactorySuccessOutputType<T> = {
  success: true;
  data: T;
};

/**
 * Represents a failure output from a factory operation.
 *
 * @property {false} success - Indicates the operation failed.
 * @property {DomainBaseException} error - The error encountered during the factory operation.
 */
export type FactoryFailureOutputType = {
  success: false;
  error: DomainBaseException;
};

/**
 * Represents the generic output type of a factory operation, which can either be a success or a failure.
 *
 * @template T - The type of the result data in case of success.
 */
export type FactoryOutputType<T> =
  | FactorySuccessOutputType<T>
  | FactoryFailureOutputType;

/**
 * Interface for a generic factory.
 *
 * @template T - The type of the result data produced by the factory.
 * @template I - The type of the input data required to create the result.
 */
export interface FactoryInterface<T, I> {
  /**
   * Creates an instance of type T using the provided input.
   *
   * @param {I} createInput - The input data required to create the result.
   * @returns {FactoryOutputType<T>} The result of the factory operation, either success or failure.
   */
  create(createInput: I): FactoryOutputType<T>;
}
