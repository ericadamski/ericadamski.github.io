var express = require('express');
var path    = require('path');
var router  = express.Router();

router.get('/*', (req, res, next) => {
  if (req.headers.host === 'ericadamski.github.io')
    if (process.env.NODE_ENV !== 'development') return res.status(400).end();
  next();
});

router.get('/',
  (req, res, next) => res.sendFile(path.join(__dirname, '..', 'index.html')));

module.exports = router;
