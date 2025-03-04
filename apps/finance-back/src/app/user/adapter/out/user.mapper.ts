import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.domain';
import { UserEntity } from './user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserMapper {
  toEntity(user: User): UserEntity {
    return plainToInstance(UserEntity, {
      id: user.id,
      email: user.email,
      password: user.getHashedPassword(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  toDomain(userEntity: UserEntity): User {
    return plainToInstance(User, {
      id: userEntity.id,
      email: userEntity.email,
      password: userEntity.password,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    });
  }
}
