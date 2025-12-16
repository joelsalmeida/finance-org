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
  tableName: 'transactions',
  freezeTableName: true,
  timestamps: true,
})
export class TransactionEntity extends Model<TransactionEntity> {
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
  sourceAccountNumber: string;

  @BelongsTo(() => AccountEntity, 'sourceAccountNumber')
  sourceAccount: AccountEntity;

  @ForeignKey(() => AccountEntity)
  @Column({
    type: DataType.STRING(14),
    allowNull: false,
  })
  destinationAccountNumber: string;

  @BelongsTo(() => AccountEntity, 'destinationAccountNumber')
  destinationAccount: AccountEntity;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;
}
