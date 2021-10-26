const gastoController = require('../controllers/gasto');

module.exports = {
  routes: ( req, res ) => {

    const { method } = req;

    if ( method === 'GET' ) {
      gastoController.getGasto(req, res);
    };

    if ( method === 'POST' ) {
      gastoController.postGasto(req, res);
    };

    if ( method === 'PUT' ) {
      gastoController.putGasto(req, res);
    };

    if ( method === 'DELETE' ) {
      gastoController.deleteGasto(req, res);
    };

  },
};
