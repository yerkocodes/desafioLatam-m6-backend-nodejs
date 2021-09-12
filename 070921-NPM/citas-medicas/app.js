const http = require('http');
const axios = require('axios');
const _lodash = require('lodash');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const chalk = require('chalk');

const limitUsers = 10;
const URLAPI = `https://randomuser.me/api/?results=${limitUsers}&inc=name`;

http.createServer((req, res) => {
  axios
    .get(URLAPI)
    .then((data) => {
      const arrayUsers = data.data.results;
      //console.log(arrayUsers);
      const fecha = moment().format('MMMM Do YYYY, h:mm:ss a');
      _lodash.forEach(arrayUsers, (u, i) => {
        let template = `${i + 1}. Nombre: ${u.name.first} - Apellido: ${u.name.last} - ID: ${uuidv4().slice(0,6)} - Timestamp: ${fecha}`;
        console.log(chalk.blue.bgWhite(template));
        res.write(`${template} \n`);
      })
      res.end();
    })
    .catch((err) => {
      console.log(err)
    })
}).listen(3000, () => {
  console.log('Escuchando en el puerto 3000');
})

