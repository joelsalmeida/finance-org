import { User } from '../../domain/user.domain';

export abstract class UserPersistencePort {
  abstract persistUser(user: User): Promise<void>;
  abstract getUserByEmail(email: string): Promise<User>;
}
