'use strict';
var express = require('express');
var morgan = require('morgan');
var db = require('./db/read-db');
var app = express();
var routes = require('./routes/');
var swig = require('swig');
var path = require('path');

swig.setDefaults({ cache: false});
app.engine('html', swig.renderFile);
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/', routes);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// app.listen(process.env.PORT || 3000);

db.connect(function(err, _conn) {
  app.listen(process.env.PORT || 3000);
})
