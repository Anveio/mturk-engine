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

// const httpProxy = require('http-proxy');

// const proxy = httpProxy.createProxyServer({
//   target: 'https://www.mturk.com',
//   localAddress: 'http://localhost:7777',
//   changeOrigin: true
// });
