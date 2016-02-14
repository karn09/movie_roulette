'use strict';

var router = require('express').Router();
var swig = require('swig');
var db = require('../db/read-db');

router.get('/movies/random/:genre', function(req, res) {
  db.randomMovie(req.params.genre, function(err, results) {
    res.render('index', {
      title: 'Random ' + req.params.genre + ' Movie',
      single: results,
      url: '/movies/random',
      mode: 'random'
    });
  });
});

router.get('/movies/by_genre', function(req, res) {
  db.movieMapGenres(function(err, results) {
    res.render('index', {
      title: 'Movies by Genre',
      map: results,
      url: '/movies/by_genre',
      mode: 'genre'
    });
  })
});

router.get('/movies/by_genre/:genre', function(req, res) {
  db.moviesByGenre(req.params.genre, function(err, results) {
    res.render('index', {
      title: 'Movies by Genre: ' + req.params.genre,
      map: results,
      url: '/movies',
      mode: 'genre'
    });
  })
});

router.get('/movies/:movie', function(req, res) {
  db.lookUpMovie(req.params.movie, function(err, results) {
      res.render('index', {
        title: req.params.genre,
        single: results,
        mode: 'genre'
      })
  })
})

router.get('/', function(req, res) {
  res.render('index', {
    mode: 'home',
    title: 'Welcome to IMDB Lite'
  })
});

module.exports = router;
