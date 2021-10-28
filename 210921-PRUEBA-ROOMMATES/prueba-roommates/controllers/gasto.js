const url = require('url');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let gastosJson = JSON.parse(fs.readFileSync("gastos.json", "utf8"));
let gastosArrayJson= gastosJson.gastos;

module.exports = {

  getGasto: ( req, res ) => {
    res.end(JSON.stringify(gastosJson));
  },

  postGasto: ( req, res ) => {
    let data;

    req.on('data', (payload) => {
      data = JSON.parse(payload);
    })

    req.on('end', () => {

      let nuevoGasto = {
        id: uuidv4().slice(30),
        roommate: data.roommate,
        descripcion: data.descripcion,
        monto: data.monto,
      };

      //console.log(nuevoGasto);
      gastosArrayJson.push(nuevoGasto);
      fs.writeFileSync("gastos.json", JSON.stringify(gastosJson));
      res.end();
    })
  },

  putGasto: ( req, res ) => {
    const { id } = url.parse(req.url, true).query;

    let data;
    req.on('data', (payload) => {
      //console.log(payload);
      data = JSON.parse(payload);
      console.log('---------')
      console.log(data)
      console.log('---------')
    });

    req.on('end', () => {
      //console.log('bien')
      gastosJson.gastos = gastosArrayJson.map((g) => {
        if ( g.id === id ) {
          //console.log('OKKK')
          //console.log(data)
          return data;
        };
        return g;
      });
      //console.log(gastosJson)
      fs.writeFileSync("gastos.json", JSON.stringify(gastosJson));
      //console.log(gastosJson)
      res.end()
    });
  },

  deleteGasto: ( req, res ) => {
    const { id } = url.parse(req.url, true).query;

    gastosJson.gastos = gastosArrayJson.filter((g) => {
      return g.id !== id;
    });

    console.log(gastosJson);
    fs.writeFileSync("gastos.json", JSON.stringify(gastosJson));
    console.log(gastosJson);
    res.end()
  },

};
