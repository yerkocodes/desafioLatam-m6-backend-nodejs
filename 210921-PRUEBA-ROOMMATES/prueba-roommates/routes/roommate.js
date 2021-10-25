const roommateController = require('../controllers/roommate');

module.exports = {
  routes: ( req, res ) => {

    const { method } = req;

    if ( method === 'GET' ) {
      roommateController.getRoommate(req, res);
    };

    if ( method === 'POST' ) {
      roommateController.postRoommate(req, res);
    };

  },
};
