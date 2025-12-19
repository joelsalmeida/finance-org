import { User } from '../../domain/user.domain';

export abstract class UserPersistencePort {
  abstract save(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User>;
}
