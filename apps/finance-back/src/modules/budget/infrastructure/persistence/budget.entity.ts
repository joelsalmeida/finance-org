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
  tableName: 'budgets',
  freezeTableName: true,
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['accountNumber', 'category'],
    },
  ],
})
export class BudgetEntity extends Model<BudgetEntity> {
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
  category: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  limit: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  spent: number;
}
