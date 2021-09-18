const enviar = require ('./mailer');
const fs = require('fs');
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    let { para, asunto, contenido } = url.parse(req.url, true).query; // ???

    if ( req.url == '/' ) {
      res.setHeader('content-type', 'text/html'); // ???
      fs.readFile('./public/index.html', 'utf8', (err, data) => {
        err ? console.log(err) : res.end(data);
      });
    };

    if (req.url.startsWith('/correos')) {
      if(para !== '' && asunto !== '' && contenido !== ''){
        enviar(para.split(','), asunto, contenido);
        res.end('Correo enviado con exito');
      } else {
        res.end('El correo no fue enviado, debe llenar los cambios');
      };
    };
  })
  .listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
  })
