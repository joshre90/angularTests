const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	app.get('/api/test/all', controller.allAccess);

	app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);

	app.get(
		'/api/test/mod',
		[authJwt.verifyToken, authJwt.isModerator],
		controller.moderatorBoard
	);

	app.get(
		'/api/test/admin',
		[authJwt.verifyToken, authJwt.isAdmin],
		controller.adminBoard
	);

	//Get vehicle maker list
	app.get('/api/user/makes', controller.userMakes);

	//Get vehicle type list
	app.get('/api/user/vehicle-type', controller.userVehicleType);

	//Get engine list
	app.get('/api/user/engine', controller.userEngine);

	//Post a Vehicle
	app.post('/api/user/vehicle', controller.userVehicle);

	//Post a booking
	app.post('/api/user/booking', controller.userBooking);
};
