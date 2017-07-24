/**
 * Credit to: https://blog.javascripting.com/2015/01/17/dont-hassle-with-cors/
 * &:  
 */

const express = require('express');
const request = require('request');

const app = express();

app.use('/', (req, res) => {
  // console.log(req.headers);
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  console.log(new Date(), ' -- Rquest Received:', req.url);

  const url = 'http://www.mturk.com' + req.url;
  req.pipe(request(url)).pipe(res);
});

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
