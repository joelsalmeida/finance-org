/**
 * Interface representing a Value Object in Domain-Driven Design (DDD).
 * A Value Object is an immutable object that is defined by its properties.
 *
 * @template V - The type of the underlying value represented by the Value Object.
 */
export interface ValueObjectInterface<V> {
  /**
   * Compares the current Value Object with another to determine equality.
   *
   * @param other - The Value Object to compare with.
   * @returns `true` if the Value Objects are equal, otherwise `false`.
   */
  equals(other: ValueObjectInterface<V>): boolean;

  /**
   * Creates a new instance of the Value Object from a given value.
   *
   * @param value - The value to create the Value Object from.
   * @returns A new instance of the Value Object.
   */
  from(value: V): ValueObjectInterface<V>;

  /**
   * Retrieves the underlying value of the Value Object.
   *
   * @returns The underlying value of the Value Object.
   */
  toValue(): V;
}
