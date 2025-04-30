import { Inject, Injectable } from '@nestjs/common';
import { UserEntity, UserMapper } from '.';
import { User } from '../../domain/user.domain';
import { UserPersistencePort } from '../../ports/out/user-persistence.port';

@Injectable()
export class UserPersistenceAdapter implements UserPersistencePort {
  constructor(
    @Inject('UserMapper')
    private readonly userMapper: UserMapper
  ) {}

  async findUserByEmail(email: string): Promise<User> {
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
