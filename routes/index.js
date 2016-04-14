var express = require('express');
var path    = require('path');
var router  = express.Router();

router.get('/*', function (req, res, next) {
  if (req.headers.host !== 'ericadamski.github.io' && process.env.NODE_ENV !== 'development')
    return res.status(400);
  next();
});

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;
