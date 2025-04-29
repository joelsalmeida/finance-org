import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.domain';
import { UserEntity } from './user.entity';
import { Email, HashedPassword } from '../../../../value-objects';

@Injectable()
export class UserMapper {
  toEntity(user: User): UserEntity {
    const userEntity = new UserEntity();

    userEntity.id = user.id;
    userEntity.email = user.email.toValue();
    userEntity.password = user.password.toValue();
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;

    return userEntity;
  }

  toDomain(userEntity: UserEntity): User {
    const userDomain = new User({
      id: userEntity.id,
      email: new Email(userEntity.email),
      password: new HashedPassword(userEntity.password),
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    });

    return userDomain;
  }
}
