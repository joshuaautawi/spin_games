import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "prizes",
})
export class Prizes extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  spin_game_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  probability!: number;
}
