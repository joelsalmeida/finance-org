import { User } from '../../domain/user.domain';

export abstract class UserPersistencePort {
  abstract save(user: User): Promise<void>;
  abstract getUserByEmail(email: string): Promise<User>;
}
