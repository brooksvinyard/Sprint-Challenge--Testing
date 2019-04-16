const db = require("../data/dbConfig.js");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
};

function get() {
  return db("games");
}

function getById(id) {
  return db("games")
    .where({ id })
    .first();
}

function insert(game) {
  return db("games")
    .insert(game)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db("games")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("games")
    .where("id", id)
    .del();
}
