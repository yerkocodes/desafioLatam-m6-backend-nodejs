const http = require('http');
const axios = require('axios');
const fs = require('fs');
const API = 'https://pokeapi.co/api/v2/pokemon';

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {

    // Endpoint encargado de mostrar el index.html en el cliente
    if( req.url == '/' ) {
      res.writeHead(200, { 'Content-type': 'text/html' });
      fs.readFile('./public/index.html', 'utf8', ( err, html ) => {
        res.end(html);
      });
    };

    let jsonPokemones = [];

    if( req.url == '/pokemones' ) {

      //Promesa 1
      const getPokemons = async () => {
        const { data } = await axios.get(API);
        return data.results;
      }
      // Promesa 2
      const getPokemonData = async (name) => {
        const { data } = await axios.get( `${API}/${name}` );
        return data;
      }

      let pokemonesPromesas = [];

      getPokemons()
        .then((results) => {
          results.map((e) => {
            pokemonesPromesas.push(getPokemonData(e.name));
          })

          Promise.all( pokemonesPromesas )
            .then((resultado) => {
              //console.log(resultado[0].sprites)
              resultado.map((pokemon) => {
                jsonPokemones.push({
                  img: pokemon.sprites.front_default,
                  nombre: pokemon.forms[0].name,
                })
              })
              //console.log(jsonPokemones)
              res.setHeader( 'Content-type', 'application/json' ); // ??? que hace exactamente esto
              res.write(JSON.stringify(jsonPokemones)); // Transformamos el arreglo de objetos "jsonPokemones" a texto y lo mostramos en el lado del cliente.
              res.end()
            })
        })
      // --------------------------------------------------------------
    };



  })
  .listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
  })
