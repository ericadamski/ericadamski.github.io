var express = require('express');
var path = require('path');
var router = express.Router();
var Busboy = require('busboy');
var fs = require("fs")

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', '..', '..', 'index.html'));
});

router.post('/marking/uploads', function (req, res, next) {
  var busboy = new Busboy({ headers: req.headers });

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var saveTo = path.join("marking", "uploads", path.basename(filename));
    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on('finish', function() {
    res.writeHead(200, { 'Connection': 'close' });
    res.end("That's all folks!");
  });
  return req.pipe(busboy);
});

module.exports = router;
