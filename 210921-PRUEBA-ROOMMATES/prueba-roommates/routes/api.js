const roommate = require('./roommate');
const gasto = require('./gasto');

module.exports = {
  routeApi: ( req, res ) => {
    const { url, method } = req;

    if ( url === '/roommates' ) { 
      roommate.routes(req, res);
    };

    if ( url.startsWith('/gasto') ) { 
      gasto.routes(req, res);
    };
    
    if ( url === '/gastos' ) { 
      gasto.routes(req, res);
    };

  }
}
