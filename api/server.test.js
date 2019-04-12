const db = require("../data/dbConfig.js");
const request = require("supertest");
const server = require("./server.js");
const Games = require("../games/gamesModel.js");

describe("server.js", () => {
  beforeEach(async () => {
    await db("games").truncate();
  });

  describe("GET /", () => {
    it("should respond with 200 OK", () => {
      return request(server)
        .get("/")
        .expect(200);
    });

    it("should be JSON", () => {
      return request(server)
        .get("/")
        .expect("Content-Type", /json/);
    });

    it("should get return {'It's alive!' }", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body.api).toBe("It's alive!");
        });
    });
  });

  describe("GET /games", () => {
      
    it("should respond with 200 OK", () => {
      return request(server)
        .get("/games")
        .expect(200);
    });

    it("should return an empty {}", async () => {
      await Games.get();
      const games = await db("games");
      expect(games).toHaveLength(0);
    });
  });

});
