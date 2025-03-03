import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

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

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
