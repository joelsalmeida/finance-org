import { Injectable } from '@nestjs/common';
import { UserPersistencePort } from '../../ports/out/user-persistence.port';
import { User } from '../../domain/user.domain';
import { UserMapper } from './user.mapper';
import { UserEntity } from './user.entity';

@Injectable()
export class UserPersistenceAdapter implements UserPersistencePort {
  constructor(private readonly userMapper: UserMapper) {}

  async getUserByEmail(email: string): Promise<User> {
    const userEntity = await UserEntity.findOne({ where: { email } });

    if (!userEntity) {
      // TODO: Define a custom domain error
      throw new Error('User not found.');
    }

    const userDomain = this.userMapper.toDomain(userEntity);
    return userDomain;
  }

  async save(user: User): Promise<void> {
    const userEntity: UserEntity = this.userMapper.toEntity(user);
    await userEntity.save();
  }
}
