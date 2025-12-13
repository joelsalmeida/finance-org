import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { AccountEntity } from '../../../account/infrastructure/persistence';

@Table({
  tableName: 'users',
  freezeTableName: true,
  timestamps: true,
})
export class UserEntity extends Model<UserEntity> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: uuidv4,
  })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @HasMany(() => AccountEntity)
  accounts: AccountEntity[];
}
