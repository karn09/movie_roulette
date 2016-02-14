'use strict';

var fs = require('fs')
var file = './imdb-large.sqlite3.db';
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var _db;

// function readDB(genre) {
// 	var exists = fs.existsSync(file);
// 	var db = new sqlite3.Database(file);
//
// 	db.all(query, genre, function(err, res) {
// 		if (err) {
// 			console.log(err.message);
// 			return null;
// 		} else {
// 			console.log(res)
// 			results.push(res);
// 		}
// 	})
// }

module.exports = {
  connect: function(cb) {
    console.log('..connecting to db');
    var filePath = path.join(__dirname, 'imdb-large.sqlite3.db');
    console.log(filePath);
    new sqlite3.Database(filePath, function(err) {
      _db = this;
      cb(err, this);
    });
  },

  query: function(sql, params, cb) {
    _db.all(sql, params, function(err, results) {
      if (results) {
        console.log(results);
      } else {
        console.log(err);
      }
      cb(err, results);
    });
  },
  randomMovie: function(genre, cb) {
    var qry = `
			SELECT m.name, d.first_name, d.last_name, m.year, m.rank
			FROM movies m, movies_directors md, directors d, movies_genres mg
			WHERE m.id = md.movie_id
			AND d.id = md.director_id
			AND m.rank > 7.0
			AND mg.movie_id = m.id
			AND mg.genre = ?
			AND m.year > 1990
			ORDER BY RANDOM()
			LIMIT 1
		`;
    return this.query(qry, [genre], cb);
  },
	lookUpMovie(movie, cb) {
		var qry = `
			SELECT m.name, d.first_name, d.last_name, m.year, m.rank
			FROM movies m, movies_directors md, directors d, movies_genres mg
			WHERE m.name LIKE ?
			AND m.id = md.movie_id
			AND d.id = md.director_id
			AND mg.movie_id = m.id
			LIMIT 1
		`;
		return this.query(qry, [movie], cb);
	},

	moviesByGenre(genre, cb) {
		var qry = `
			SELECT m.name, m.year, m.rank
			FROM movies m, movies_genres mg
			WHERE mg.movie_id = m.id
			AND mg.genre = ?
			LIMIT 300
		`;
		return this.query(qry, [genre], cb);
	},

  movieMapGenres(cb) {
    var qry = `
			SELECT genre as name, count(*) as count
			FROM movies
			JOIN movies_genres
			ON movies_genres.movie_id = movies.id
			GROUP BY genre
			ORDER BY count DESC
			`;
    return this.query(qry, [], cb);
  }
};
