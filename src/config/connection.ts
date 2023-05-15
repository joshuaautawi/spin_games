import { Sequelize } from "sequelize-typescript";
import { SpinGames } from "../spin_game/entity";
import { Prizes } from "../prize/entity";
import { SpinHistory } from "../spin_history/entity";

const connection = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  database: "starcade",
  logging: false,
  models: [SpinGames, Prizes, SpinHistory],
});

export default connection;
