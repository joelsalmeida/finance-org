import { Injectable } from '@nestjs/common';
import { UserPersistencePort } from '../../ports/out/user-persistence.port';
import { User } from '../../domain/user.domain';
import { UserMapper } from './user.mapper';
import { UserEntity } from './user.entity';

@Injectable()
export class UserPersistenceAdapter implements UserPersistencePort {
  constructor(private userMapper: UserMapper) {}

  async getUserByEmail(email: string): Promise<User> {
    const userEntity = await UserEntity.findOne({ where: { email } });

    if (!userEntity) {
      throw new Error('User not found.');
    }

    return this.userMapper.toDomain(userEntity);
  }

  async persistUser(user: User): Promise<void> {
    const userEntity: UserEntity = this.userMapper.toEntity(user);
    await userEntity.save();
  }
}
