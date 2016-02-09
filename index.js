var express = require('express');
var morgan = require('morgan');

var app = express();
var routes = require('./routes/');

app.use(morgan('dev'));
app.use('/', routes);
app.use(express.static('public'));

app.set('views', __dirname + '/views/');
app.set('view engine', 'html');

app.listen(process.env.PORT || 3000);
