exports.seed = function(knex, Promise) {
  return knex('games')
    .truncate()
    .then(function() {
      return knex('games').insert([
        {
          title: 'Pacman',
          genre: 'Arcade',
          releaseYear: 1980
        },
        {
          title: 'Super Mario Bros',
          genre: 'Platform',
          releaseYear: 1985
        },
      ]);
    });
};
