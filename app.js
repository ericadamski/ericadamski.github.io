var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

app.use(favicon(__dirname + '../../../img/e.png'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '..', '..', 'public')));
app.use('/css', express.static(path.join(__dirname, '..', '..', 'css')));
app.use('/bower_components',
  express.static(path.join(__dirname, '..', '..', 'bower_components')));
app.use('/js', express.static(path.join(__dirname, '..', '..', 'js')));
app.use('/views', express.static(path.join(__dirname, '..', '..', 'views')));
app.use('/img', express.static(path.join(__dirname, '..', '..', 'img')));
app.use('/portfolio',
  express.static(path.join(__dirname, '..', '..', 'portfolio')));
app.use('/marking',
  express.static(path.join(__dirname, '..', '..', 'marking')));

app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
