import { expect } from "chai";
import chai from "chai";
import "mocha";
import { createApp } from "../src/server";
const app = createApp();
import chaiHttp from "chai-http";
chai.use(chaiHttp);
describe("This", () => {
  describe("should", () => {
    it("always pass", () => {
      expect(true).to.equal(true);
    });
  });
});

describe("Hello API Request", () => {
  it("should return response on call", () => {
    return chai
      .request(app)
      .get("/ping")
      .then((res) => {
        chai.expect(res.text).to.eql("pingpong");
        chai.expect(res.status).to.eql(200);
      });
  });
});
