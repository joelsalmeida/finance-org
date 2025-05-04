import { Injectable } from '@nestjs/common';
import { Email, HashedPassword } from '../../../../value-objects';
import { UserId } from '../../../../value-objects/unique-identifiers';
import { User } from '../../domain/user.domain';
import { UserEntity } from './user.entity';

@Injectable()
export class UserMapper {
  toEntity(user: User): UserEntity {
    const userEntity = new UserEntity();

    userEntity.id = user.id.toValue();
    userEntity.email = user.email.toValue();
    userEntity.password = user.password.toValue();
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;

    return userEntity;
  }

  toDomain(userEntity: UserEntity): User {
    const userDomain = new User({
      id: UserId.fromString(userEntity.id),
      email: new Email(userEntity.email),
      password: new HashedPassword(userEntity.password),
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    });

    return userDomain;
  }
}
