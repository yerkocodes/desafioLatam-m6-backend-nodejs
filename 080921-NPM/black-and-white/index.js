const http = require('http');
const url = require('url');
const fs = require('fs');
const yargs = require('yargs');
const child = require('child_process');
const Jimp = require('jimp');

const key = 123;

const PORT = process.env.PORT || 3000;

const argv = yargs
//.command( <comando> , <descripción>, <constructor>, <callback> )
  .command('key', 'Pase para inicializar el servidor', {
    key: {
      describe: 'Ingresar pass para inicializar el sevidor',
      demand: true,
      alias: 'k',
    }
  }, ( args ) => {
    args.key == key ? 

      http
      .createServer((req, res) => {

        // Mostrar index en el lado del cliente
        if( req.url == '/' ){
          res.writeHead(200, { 'Content-Type': 'text/html' });
          fs.readFile('./public/index.html', 'utf8', (err, html) => {
            res.end(html);
          });
        };

        // Mostrar css en el lado del cliente
        if ( req.url == '/estilos' ) {
          res.writeHead(200, { 'Content-Type': 'text/css' });
          fs.readFile('./public/assets/css/estilos.css', (err, css) => {
            res.end(css);
          });
        };

        const params = url.parse(req.url, true).query;
        const link = params.link;

        if ( req.url.includes('/jimp')  ) {
          console.log('Resulto!');
          console.log(link);

          Jimp.read(link, (err, img) => {
            img
              .resize(350, Jimp.AUTO)
              .grayscale()
              .quality(60)
              .writeAsync('newImg.jpg')
              .then(() => {
                fs.readFile('newImg.jpg', (err, imagen) => {
                  res.end(imagen);
                })
              })

          })

        };

      })
      .listen(PORT, () => {
        console.log('Pass correcta, Inicializando servidor.');
        console.log(`Escuchando en el puerto ${PORT}`);
      })

      : console.log('Key incorrecta');
  })
  .help().argv


