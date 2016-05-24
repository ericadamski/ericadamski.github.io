var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

app.use(require('compression')({ level: 9 }));

app.use(favicon(path.join(__dirname, 'public', 'img', 'e.png')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'build')));
app.use('/bower_components',
  express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);

module.exports = app;
