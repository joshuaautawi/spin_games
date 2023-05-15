import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Unique,
} from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "spin_games",
})
export class SpinGames extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
}
