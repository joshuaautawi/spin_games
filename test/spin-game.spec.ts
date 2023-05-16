import { expect } from "chai";
import chai from "chai";
import "mocha";
import { createApp } from "../src/server";
const app = createApp();
import chaiHttp from "chai-http";
import { CreateRequest } from "../src/spin_game/request";
chai.use(chaiHttp);
import { v4 as uuid } from "uuid";
describe("spin game API", () => {
  let id = uuid();
  let historyId: string;
  let prizeId: string;
  it("should return spin game in property data", () => {
    const request: CreateRequest = { id, name: "Game created" };
    return chai
      .request(app)
      .post("/spin-games")
      .send(request)
      .then((res) => {
        chai.expect(res.status).to.eql(201);
        chai.expect(res.body).to.have.an("object");
        chai.expect(res.body).to.have.property("data");
      });
  });

  it("should return forbidden, the name is number", () => {
    const request: any = { id: uuid(), name: 2 };
    return chai
      .request(app)
      .post("/spin-games")
      .send(request)
      .then((res) => {
        chai.expect(res.status).to.eql(403);
        chai.expect(res.body).to.have.property("status").equal("FORBIDDEN");
      });
  });

  it("should return forbidden, length < 5", () => {
    const request: CreateRequest = { id: uuid(), name: "Game" };
    return chai
      .request(app)
      .post("/spin-games")
      .send(request)
      .then((res) => {
        chai.expect(res.status).to.eql(403);
        chai.expect(res.body).to.have.property("status").equal("FORBIDDEN");
      });
  });

  it("should return all spin games", () => {
    return chai
      .request(app)
      .get("/spin-games")
      .then((res) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.have.an("object");
        chai.expect(res.body).to.have.property("data");
      });
  });

  it("should return  one spin games", () => {
    return chai
      .request(app)
      .get(`/spin-games/${id}`)
      .then((res) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.have.an("object");
        chai.expect(res.body).to.have.property("data");
      });
  });

  it("should return not found because the id is wrong", () => {
    return chai
      .request(app)
      .get(`/spin-games/${id}a`)
      .then((res) => {
        chai.expect(res.status).to.eql(404);
        chai.expect(res.body).to.have.an("object");
        chai.expect(res.body).to.have.property("status").equal("NOT_FOUND");
      });
  });

  it("should return updated spinGames", () => {
    return chai
      .request(app)
      .put(`/spin-games/${id}`)
      .send({ name: "changeName" })
      .then((res) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.have.an("object");
        chai
          .expect(res.body)
          .to.have.property("data")
          .to.have.property("name")
          .equal("changeName");
      });
  });
  it("should return forbidden, name is not string", () => {
    return chai
      .request(app)
      .put(`/spin-games/${id}`)
      .send({ name: 2 })
      .then((res) => {
        chai.expect(res.status).to.eql(403);
        chai.expect(res.body).to.have.an("object");
      });
  });

  it("should return forbidden, length < 5", () => {
    return chai
      .request(app)
      .put(`/spin-games/${id}`)
      .send({ name: "asd" })
      .then((res) => {
        chai.expect(res.status).to.eql(403);
        chai.expect(res.body).to.have.an("object");
      });
  });

  it("should return not found because the id is wrong", () => {
    return chai
      .request(app)
      .put(`/spin-games/${id}a`)
      .send({ name: "changeName" })
      .then((res) => {
        chai.expect(res.status).to.eql(404);
        chai.expect(res.body).to.have.an("object");
        chai.expect(res.body).to.have.property("status").equal("NOT_FOUND");
      });
  });

  it("should return not found because the id is wrong", () => {
    return chai
      .request(app)
      .delete(`/spin-games/${id}a`)
      .then((res) => {
        chai.expect(res.status).to.eql(404);
        chai.expect(res.body).to.have.an("object");
        chai.expect(res.body).to.have.property("status").equal("NOT_FOUND");
      });
  });

  it("should return spin history", () => {
    return chai
      .request(app)
      .post(`/spin/${id}`)
      .then((res) => {
        chai.expect(res.status).to.eql(201);
        chai.expect(res.body).to.have.an("object");
        chai.expect(res.body).to.have.property("data").to.have.property("id");
        historyId = res.body.data.id;
        prizeId = res.body.data.prize_id;
      });
  });

  it("should return spin history", () => {
    return chai
      .request(app)
      .get(`/spin-history/${historyId}`)
      .then((res) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.have.an("object");
        chai
          .expect(res.body)
          .to.have.property("data")
          .to.have.property("prize_id")
          .equal(prizeId);
        chai
          .expect(res.body)
          .to.have.property("data")
          .to.have.property("spin_game_id")
          .equal(id);
      });
  });

  it("should return deleted", () => {
    return chai
      .request(app)
      .delete(`/spin-games/${id}`)
      .then((res) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.have.an("object");
      });
  });

  it("should return not found, id is wrong", () => {
    return chai
      .request(app)
      .delete(`/spin-games/${id}a`)
      .then((res) => {
        chai.expect(res.status).to.eql(404);
        chai.expect(res.body).to.have.an("object");
      });
  });

  it("should return not found ,deleted! ", () => {
    return chai
      .request(app)
      .get(`/spin-games/${id}`)
      .then((res) => {
        chai.expect(res.status).to.eql(404);
        chai.expect(res.body).to.have.an("object");
        chai.expect(res.body).to.have.property("status").equal("NOT_FOUND");
      });
  });
});
