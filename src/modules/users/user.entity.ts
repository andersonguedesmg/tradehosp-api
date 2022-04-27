import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
  })
  rg: string;

  @Column({
    type: DataType.STRING(14),
    allowNull: false,
    unique: true,
  })
  cpf: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  job: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  employer: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userType: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean;
}
