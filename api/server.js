const express = require('express');

const games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: "It's alive!" });
  // res.status(200).send('hello'); // we used this to send a string to test JSON
});

server.get('/games', async (req, res) => {
  const g = await games.getAll();
  res.status(200).json(g);
});

module.exports = server;