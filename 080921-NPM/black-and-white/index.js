const http = require('http');
const fs = require('fs');
//const Jimp = require('jimp');

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    if( req.url == '/' ){
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.readFile('./public/index.html', 'utf8', (err, html) => {
        res.end(html);
      });
    };

    if ( req.url == '/estilos' ) {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      fs.readFile('./public/assets/css/estilos.css', (err, css) => {
        res.end(css);
      });
    }

    //if ( req.url.includes('/jimp')  ) {
    //console.log('Resulto!');
    //}

  })
  .listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
  })
