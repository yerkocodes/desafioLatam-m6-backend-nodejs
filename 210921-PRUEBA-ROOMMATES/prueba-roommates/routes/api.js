const roommate = require('./roommate');
const gasto = require('./gasto');

module.exports = {
  routeApi: ( req, res ) => {
    const { url, method } = req;

    if ( url === '/roommate' ) { 
      roommate.routes(req, res);
    };

    if ( url === '/gasto' ) { 
      gasto.routes(req, res);
    };
    
    if ( url === '/gastos' ) { 
      gasto.routes(req, res);
    };

  }
}
