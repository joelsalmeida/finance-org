import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from '../../../user/infrastructure/persistence';

@Table({
  tableName: 'accounts',
  freezeTableName: true,
  timestamps: true,
})
export class AccountEntity extends Model<AccountEntity> {
  @Column({
    primaryKey: true,
    type: DataType.STRING(14), // Format "1234-5678-9012"
    allowNull: false,
  })
  accountNumber: string;

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  ownerId: string;

  @BelongsTo(() => UserEntity)
  owner: UserEntity;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  balance: number;
}
