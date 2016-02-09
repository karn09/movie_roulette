var fs = require('fs')
var file = './imdb-large.sqlite3.db';
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
	db.each(randomMovieFromGenre('Drama'), function(err, row) {
		console.log(row);
	});
});


function randomMovieFromGenre (genre) {
	var query = ' SELECT m.name, d.first_name, d.last_name, m.year, m.rank ' +
				' FROM movies m, movies_directors md, directors d, movies_genres mg ' +
				' WHERE m.id = md.movie_id ' +
				' AND d.id = md.director_id ' +
				' AND m.rank > 7.0 ' +
				' AND mg.movie_id = m.id ' +
				' AND mg.genre = ' + '"' + genre + '"' +
				' AND m.year > 1990 ' +
				' ORDER BY RANDOM() ' +
				' LIMIT 1 ';
	return query;
}

// on genre
// return 1 movie with - actors, director, year, rank