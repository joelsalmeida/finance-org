import { User } from '../../domain/user.domain';

export abstract class UserPersistencePort {
  abstract save(user: User): Promise<void>;
  abstract findUserByEmail(email: string): Promise<User>;
}
