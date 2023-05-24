import { SpinGames } from "./entity";
import { CreateRequest, UpdateRequest } from "./request";
import { Prizes } from "../prize/entity";
import { v4 as uuid } from "uuid";
import { SpinHistory } from "../spin_history/entity";

export default class SpinGamesController {
  public async getAll() {
    const spinGames = await SpinGames.findAll();
    return spinGames;
  }
  public async getOne(id: string) {
    try {
      const spinGame = await SpinGames.findOne({ where: { id } });
      return spinGame;
    } catch (error) {
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const spinGame = await this.getOne(id);
      if (!spinGame) {
        return null;
      }
      await Prizes.destroy({ where: { spin_game_id: id } });
      await SpinGames.destroy({ where: { id } });
      return spinGame;
    } catch (error) {
      return null;
    }
  }
  public async update(id: string, body: UpdateRequest) {
    const spinGame = await this.getOne(id);
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
    const spinGame = await this.getOne(id);
    if (!spinGame) {
      return null;
    }
    const prizes = await Prizes.findAll({
      where: { spin_game_id: id },
      order: [["probability", "ASC"]],
    });
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
    return await SpinHistory.create({
      spin_game_id: spinGame.id,
      prize_id: choosenPrize?.id,
    });
  }

  public async history(id: string) {
    try {
      const history = await SpinHistory.findOne({ where: { id } });
      return history;
    } catch (error) {
      return null;
    }
  }
}
