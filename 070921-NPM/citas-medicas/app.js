const http = require('http');
const axios = require('axios');
const _lodash = require('lodash');

const URLAPI = 'https://randomuser.me/api/?results=10&inc=name';

http.createServer(() => {
  axios
    .get(URLAPI)
    .then((data) => {
      const arrayUsers = data.data.results;
      _lodash.forEach(arrayUsers, (u) => {
        console.log(u);
      })
    })
    .catch((err) => {
      console.log(err)
    })
}).listen(3000, () => {
  console.log('Escuchando en el puerto 8080')
})

