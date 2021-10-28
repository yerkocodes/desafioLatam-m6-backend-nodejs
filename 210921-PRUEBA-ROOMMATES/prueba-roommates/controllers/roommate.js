const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const fs = require('fs');
const APIRANDOM = `https://randomuser.me/api/`;

let roommatesJson = JSON.parse(fs.readFileSync("roommates.json", "utf8"));
let roommatesArrayJson= roommatesJson.roommates;

module.exports = {

  getRoommate: ( req, res ) => {
    res.setHeader("content-type", "application/json");
    //console.log('hola desde getRoommate')
    res.end(JSON.stringify(roommatesJson));
    //console.log(JSON.stringify(roommatesJson));
  },

  postRoommate: async ( req, res ) => {
    try {

      const { data } = await axios.get(APIRANDOM);

      const dataRandomUser = data.results[0];
      //console.log(dataRandomUser.name.first)

      let randomPerson = {
        id: uuidv4().slice(30),
        nombre: dataRandomUser.name.first,
        debe: 0,
        recibe: 0,
      };

      roommatesArrayJson.push(randomPerson);
      fs.writeFileSync("roommates.json", JSON.stringify(roommatesJson));
      res.end(JSON.stringify(roommatesJson));
      console.log('Nuevo Roommate agregado.');
      console.log(roommatesJson);
      //console.log(randomPerson);
      //console.log(roommatesArrayJson);

    } catch ( err ) {
      console.log(err.message);
    };

  },

};
