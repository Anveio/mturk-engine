const express = require('express');
const cors = require('cors');
const request = require('request');
const cookies = require('./cookie');

const app = express();

function logger(req, res, next) {
  console.log(
    new Date().toLocaleTimeString(),
    req.method,
    'Request Received:',
    req.originalUrl
  );
  next();
}

app.use(cors());

app.use('*', logger, (req, res) => {
  req.headers.cookie = cookies;
  /**
   * Credit to: https://blog.javascripting.com/2015/01/17/dont-hassle-with-cors/
   */
  const url = 'https://worker.mturk.com' + req.originalUrl;
  req.pipe(request(url)).pipe(res);
});

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
