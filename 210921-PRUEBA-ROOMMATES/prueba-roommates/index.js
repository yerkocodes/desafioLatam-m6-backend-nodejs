const http = require('http');
const axios = require('axios');
const fs = require('fs');
const { routeApi } = require('./routes/api');

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {

    // Devolver index en el lado del cliente
    if( req.url == '/' ){
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.readFile('./public/index.html', 'utf8', (err, html) => {
        res.end(html);
      });
    };

    // Devolver css en el lado del cliente
    if ( req.url == '/styles' ) {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      fs.readFile('./public/assets/css/styles.css', (err, css) => {
        res.end(css);
      });
    };

    // Devolver js en el lado del cliente
    if ( req.url == '/script' ) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      fs.readFile('./public/assets/js/script.js', (err, js) => {
        res.end(js);
      });
    };

    routeApi(req, res)

  })
  .listen(PORT, () => {
    console.log('Listening Server on port ' + PORT);
  })
