const express = require('express');

const games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());
const gamesRouter = require('../games/gamesRouter.js');


server.use('/games', gamesRouter);

server.get('/', async (req, res) => {
  res.status(200).json({ api: "It's alive!" });
});

// server.get('/games', async (req, res) => {
//   const g = await games.getAll();
//   res.status(200).json(g);
// });

module.exports = server;