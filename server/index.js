var express = require('express');
var request = require('request');

var app = express();
app.use('/', function(req, res) {
  var url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 4000);
