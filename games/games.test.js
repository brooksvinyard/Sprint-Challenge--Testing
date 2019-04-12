const db = require("../data/dbConfig.js");
const Games = require("./gamesModel.js");
const request = require("supertest");
const server = require("../api/server.js");

describe("games model", () => {
  beforeEach(async () => {
    await db("games").truncate();
  });

  describe("insert()", () => {
    it("should insert the provided games", async () => {
      await Games.insert({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      await Games.insert({
        title: "Super Mario Bros",
        genre: "Platform",
        releaseYear: 1985
      });

      const games = await db("games");
      expect(games).toHaveLength(2);
    });

    it("should insert the provided game", async () => {
      let game = await Games.insert({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      expect(game.title).toBe("Pacman");

      game = await await Games.insert({
        title: "Super Mario Bros",
        genre: "Platform",
        releaseYear: 1985
      });
      expect(game.genre).toBe("Platform");
    });

    it("should fail the insert 422", () => {
      return request(server)
        .post("/games")
        .send({ title: "", genre: "" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(422);
    });

    it("should return a 201 created", () => {
      return request(server)
        .post("/games")
        .send({
          title: "Pacman",
          genre: "Arcade",
          releaseYear: 1980
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(201);
    });
  });

  describe("remove()", () => {
    it("should remove the provided games", async () => {
      // Add two games...
      await Games.insert({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      await Games.insert({
        title: "Super Mario Bros",
        genre: "Platform",
        releaseYear: 1985
      });
      const games = await db("games");
      expect(games).toHaveLength(2);

      // Remove two games...
      await Games.remove(1);
      await Games.remove(2);
      const delGames = await db("games");
      expect(delGames).toHaveLength(0);
    });

    it("should return a 404", async () => {
      // Add a game...
      await Games.insert({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      const games = await db("games");
      expect(games).toHaveLength(1);

      // Remove the game get a 404...
      return request(server)
        .delete("/games")
        .send({
          title: "Pacman",
          genre: "Arcade",
          releaseYear: 1980
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(404);
    });
  });

  describe("getById()", () => {
    it("should get the game by id", async () => {
      // Insert a couple games
      await Games.insert({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      await Games.insert({
        title: "Super Mario Bros",
        genre: "Platform",
        releaseYear: 1985
      });
      const games = await db("games");
      expect(games).toHaveLength(2);

      // Remove the second one by id
      const getGameId = await Games.getById(2);
      expect(getGameId.title).toBe("Super Mario Bros");
    });

    it("should return a 404 if not found", async () => {
      // Add a game...
      await Games.insert({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      const games = await db("games");
      expect(games).toHaveLength(1);

      // Try an ID that does not exist get a 404...
      return request(server)
        .get("/games/2651")
        .expect(404);
    });
  });
});
