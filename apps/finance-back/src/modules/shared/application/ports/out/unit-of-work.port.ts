export enum LOCK_MODE {
  NONE = 'NONE',
  WRITE = 'WRITE',
  READ = 'READ',
}

export type TransactionContext = unknown;

export interface UowOptions {
  lockMode?: LOCK_MODE,
  transactionContext?: TransactionContext
}

export abstract class UnitOfWorkPort {
  abstract execute<T>(work: (options: UowOptions) => Promise<T>): Promise<T>;
}
