const express = require('express');
const request = require('request');
const cookies = require('./cookie');

const app = express();

app.use('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  console.log(new Date(), ' -- Request Received:', req.originalUrl);
  req.headers.cookie = cookies;
  /**
  * Credit to: https://blog.javascripting.com/2015/01/17/dont-hassle-with-cors/
  */
  const url = 'http://www.mturk.com' + req.originalUrl;
  req.pipe(request(url)).pipe(res);
});

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
