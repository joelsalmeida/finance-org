import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { AccountEntity } from '../../../account/infrastructure/persistence';

@Table({
  tableName: 'pots',
  freezeTableName: true,
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['accountNumber', 'name'],
    },
  ],
})
export class PotEntity extends Model<PotEntity> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => AccountEntity)
  @Column({
    type: DataType.STRING(14), // "1234-5678-9012"
    allowNull: false,
  })
  accountNumber: string;

  @BelongsTo(() => AccountEntity)
  account: AccountEntity;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  goalAmount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  allocated: number;
}
