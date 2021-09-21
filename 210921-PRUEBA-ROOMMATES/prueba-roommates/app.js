const http = require('http');
const axios = require('axios');
const fs = require('fs');
const getDataUserMod = require('./modules/getdatauser');

const APIRANDOM = `https://randomuser.me/api`;
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

    if ( req.url == '/roommate' ) { 

      getDataUserMod(APIRANDOM);

      //console.log(getDataUserMod(APIRANDOM));

      //axios.get(APIRANDOM)
        //.then((data) => {
          //getDataUserMod(data);
          ////console.log(data.data);
          ////res.end();
        //})
        //.catch((err) => {
          //console.log(err);
        //})
    };

  })
  .listen(PORT, () => {
    console.log('Listening Server on port ' + PORT);
  })
