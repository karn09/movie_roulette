SELECT m.name, d.first_name, d.last_name, m.year, m.rank
FROM movies m, movies_directors md, directors d, movies_genres mg
WHERE m.id = md.movie_id
AND d.id = md.director_id
AND m.rank > 7.0
AND mg.movie_id = m.id
AND mg.genre = 'Drama'
AND m.year > 1990
ORDER BY RANDOM()
LIMIT 1;