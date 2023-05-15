import { Get, Route } from "tsoa";
import { SpinGames } from "./entity";
import { PingResponse } from "./response";
import { CreateRequest, UpdateRequest } from "./request";
import { Prizes } from "../prize/entity";
import { v4 as uuid } from "uuid";
import { SpinHistory } from "../spin_history/entity";

@Route("ping")
export default class SpinGamesController {
  @Get("/")
  public async getMessage(): Promise<PingResponse> {
    return {
      message: "pingpong",
    };
  }

  public async getAll() {
    const spinGames = await SpinGames.findAll();
    return spinGames;
  }
  public async getOne(id: string) {
    const spinGame = await SpinGames.findOne({ where: { id } });
    return spinGame;
  }

  public async delete(id: string) {
    const spinGame = await SpinGames.findOne({ where: { id } });
    await Prizes.destroy({ where: { spin_games_id: id } });
    if (!spinGame) {
      return null;
    }
    await SpinGames.destroy({ where: { id } });
    return spinGame;
  }
  public async update(id: string, body: UpdateRequest) {
    const spinGame = await SpinGames.findOne({ where: { id } });
    if (!spinGame) {
      return null;
    }
    spinGame.name = body.name;
    return await spinGame.save();
  }
  public async create(body: CreateRequest) {
    const spinGames = await SpinGames.create({ ...body });

    let arr = [0.1, 0.2, 0.3, 0.7];
    await Promise.all(
      arr.map(async (e, i) => {
        await Prizes.create({
          id: uuid(),
          name: "prize " + i,
          spin_game_id: spinGames.id,
          probability: e,
        });
      })
    );

    return spinGames;
  }

  public async spin(id: string) {
    const spinGame = await SpinGames.findOne({ where: { id } });
    if (!spinGame) {
      return null;
    }
    const prizes = await Prizes.findAll({
      where: { spin_game_id: id },
      order: [["probability", "ASC"]],
    });
    console.log(prizes);
    const random = Math.random();
    let choosenPrize;
    for (let i = 0; i < prizes.length; i++) {
      if (random <= prizes[i].probability) {
        choosenPrize = prizes[i];
        break;
      }
    }
    if (!choosenPrize) {
      choosenPrize = prizes[prizes.length - 1];
    }

    await SpinHistory.create({
      spin_game_id: spinGame.id,
      prize_id: choosenPrize?.id,
    });
    return choosenPrize;
  }
}
