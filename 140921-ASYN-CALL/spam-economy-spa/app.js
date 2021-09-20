const enviar = require ('./mailer');
const fs = require('fs');
const http = require('http');
const url = require('url');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const API = `https://mindicador.cl/api`;
const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    let { correos, asunto, contenido } = url.parse(req.url, true).query; // ???
    // Mostrar el index.html en el lado del servidor
    if ( req.url == '/' ) {
      res.setHeader('content-type', 'text/html'); // ???
      fs.readFile('./public/index.html', 'utf8', (err, data) => {
        err ? console.log(err) : res.end(data);
      });
    };

    if (req.url.startsWith('/mailing')) {
      if(correos !== '' && asunto !== '' && contenido !== ''){
        axios.get(API)
          .then((data) => {
            let template = `
Destinatarios: ${correos}.
Asunto: ${asunto}.

Contenido:

${contenido}

El valor del ${data.data.dolar.codigo} el dia de hoy es: ${data.data.dolar.valor}
El valor del ${data.data.euro.codigo} el dia de hoy es: ${data.data.euro.valor}
El valor del ${data.data.uf.codigo} el dia de hoy es: ${data.data.uf.valor}
El valor del ${data.data.utm.codigo} el dia de hoy es: ${data.data.utm.valor}
            `;
            //console.log(template);
            fs.writeFile(`./correos/${uuidv4().slice(0,6)}.txt`, template, 'utf8', (err, data) => {
              console.log(data);
            });
            enviar(correos.split(','), asunto, template);
            res.end('Correo enviado con exito');
          })
          .catch((err) => {
            res.end('Correo no enviado.');
            console.log(err);
          })
      } else {
        res.end('El correo no fue enviado, debe llenar los campos.');
      };
    };
  })
  .listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
  })
