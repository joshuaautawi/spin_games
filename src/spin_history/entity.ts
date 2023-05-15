import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "spin_history",
})
export class SpinHistory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  spin_game_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  prize_id!: string;
}
