const https = require('https');
const fs = require('fs');
const ARGV = process.argv;
const API = `https://mindicador.cl/api/${ARGV[4]}`; // Coin data to search

https
  .get(API, ( response ) => {
    response.on('data', (data) => {
      const apiData = JSON.parse(data);
      const coinValue = apiData.serie[0].valor; // Current coin value
      const date = new Date();
      let template = `
          A la fecha: ${date}
          Fue realizada cotización con los siguientes datos:
          Cantidad de pesos a convertir: ${ARGV[5]} pesos
          Convertido a "${ARGV[4]}" da un total de:
          $${parseFloat(ARGV[5]/coinValue).toFixed(1)}
        `;
      console.log(template);
      /* Arguments: FileName, FileExtension, Coin, AmountToConvert */
      //fs.writeFile(`${ARGV[2]}.${ARGV[3]}`, template, 'utf8', () => {
        //console.log('Archivo creado con exito');
      //})
    })
    .on('error', (err) => {
      console.log(err);
    })
  });
