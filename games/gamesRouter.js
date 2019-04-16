const express = require("express");

const Games = require("./gamesModel.js");

const router = express.Router();

// GET /games
// Get all games
router.get("/", async (req, res) => {
  try {
    const games = await Games.get(req.query);
    res.status(200).json(games);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the games"
    });
  }
});

// GET /games/:id
// Get a game by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Games.getById(id)
    .then(games => {
      if (!games) {
        res
          .status(404)
          .json({ message: "The game with the specified ID does not exist." });
      } else {
        res.status(200).json(games);
      }
    })
    .catch(error => {
      res.status(404).json({ message: "The game could not be retrieved." });
    });
});

// POST /games
// Add a game
// {
//     title: 'Pacman', // required
//     genre: 'Arcade', // required
//     releaseYear: 1980 // not required
// }
router.post("/", (req, res) => {
  const gameInfo = req.body;
  console.log("game information", gameInfo);

  Games.insert(gameInfo)
    .then(games => {
      if (!gameInfo.title) {
        res
          .status(422)
          .json({ message: "Please provide the title of the game." });
      } else if (!gameInfo.genre) {
        res
          .status(422)
          .json({ message: "Please provide the genre of the game." });
      } else {
        res.status(201).json(games);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error while saving the game to the database"
      });
    });
});

// DELETE /games/:id
// Delete a game by id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Games.remove(id)
    .then(deleted => {
      if (!deleted) {
        res
          .status(500)
          .json({ message: "The game with the specified ID does not exist." });
      } else {
        res.status(204).end();
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The game could not be removed" });
    });
});

// PUT /games/:id
// Update a game by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Games.update(id, changes)
    .then(updated => {
      if(!id) {
        res
          .status(500)
          .json({ message: "The game with the specified ID does not exist." });
      } else if(!changes.title) {
        res
          .status(422)
          .json({ message: "Please provide the title of the game." });
      } else if(!changes.genre) {
        res
          .status(422)
          .json({ message: "Please provide the genre of the game." });
      } else if(updated) {
        res.status(200).json(changes);
      } else {
        res.status(404).json({ message: "Game not found." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The game information could not be modified." });
    });
});

module.exports = router;
