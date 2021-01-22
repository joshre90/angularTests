const db = require('../models');
const Booking = db.booking;
const TimeSlot = db.timeSlot;
const Make = db.make;
const Engine = db.engine;
const Vehicle_Type = db.vehicle_type;
const Vehicle = db.vehicle;
const Service = db.service_type;
const Service_Type = db.service_type;
const mongoose = require('mongoose');

exports.allAccess = (req, res) => {
	res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
	res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
	res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
	res.status(200).send('Moderator Content.');
};

////////POSTS

//Posting a booking
exports.userBooking = async (req, res) => {
	let bodyDate = req.body.Date;
	let Slot = req.body.Slot;
	let id_Booking, id_service;
	let nameServ = req.body.Service;

	//Getting the id from the Service collection
	try {
		var query = {
			name: nameServ,
		};
		id_service = await Service.findOne(query, function (error, result) {
			if (!error) {
				// If the document doesn't exist
				if (result) {
					console.log(result._id);
					return result._id;
				}
			}
		});
	} catch (err) {
		console.log('err' + err);
	}

	//Saving in the Booking Collection
	try {
		const booking = new Booking({
			First_name: req.body.First_name,
			Last_name: req.body.Last_name,
			Phone: req.body.Phone,
			Comments: req.body.Comments,
			Status: req.body.Status,
			Date: req.body.Date,
			id_vehicle: req.body.id_vehicle,
			id_service_type: null,
		});

		//console.log(booking.id_vehicle);
		id_Booking = booking.id;
		booking.id_service_type = id_service._id;

		//Saves the Date and status in the Timeslot Collection. Returns an error if could not reach the DB
		idDate(bodyDate, Slot, id_Booking, (res) => {
			if (err) {
				return res.status(500).send('Error in the DB');
			}
		});

		//console.log('id', id_service);
		console.log('Booking', booking);
		await booking.save(function (error) {
			if (!error) {
				// Do something with the document
			} else {
				throw error;
			}
		});

		res.send({ message: 'Booking was registered successfully!' });
		console.log('Booking added');
	} catch (err) {
		console.log('err' + err);
	}
};

//Funtion used to save the slot in the  TimeSlot collection
const idDate = async function (Date, Slot, id_Book) {
	try {
		var query = {
			Date,
		};

		await TimeSlot.findOne(query, function (error, result) {
			if (!error) {
				// If the document doesn't exist
				if (!result) {
					// Create it
					console.log('Not result found in TimeSlot Collection');
					result = new TimeSlot({
						Date: Date,
						Slots: null,
					});
					if (Slot == 's1') {
						result.Slots.s1 = id_Book;
					} else if (Slot == 's2') {
						result.Slots.s2 = id_Book;
					} else if (Slot == 's3') {
						result.Slots.s3 = id_Book;
					} else if (Slot == 's4') {
						result.Slots.s4 = id_Book;
					}
					console.log('Creaiting result', result);
					id_date = result.id;
					result.save(function (error) {
						if (!error) {
							// Do something with the document
						} else {
							throw error;
						}
					});

					//If date exists
				} else {
					console.log('date exist');
					console.log('Result before adding solts', result);
					if (Slot == 's1' && !result.Slots.s1) {
						result.Slots.s1 = id_Book;
					} else if (Slot == 's2' && !result.Slots.s2) {
						result.Slots.s2 = id_Book;
					} else if (Slot == 's3' && !result.Slots.s3) {
						result.Slots.s3 = id_Book;
					} else if (Slot == 's4' && !result.Slots.s4) {
						result.Slots.s4 = id_Book;
					} else {
						console.log('The slot was already filled');
					}
					id_date = result.id;
					//console.log('Result after adding slot:', result);
					result.save(function (error) {
						if (!error) {
							// Do something with the document
						} else {
							throw error;
						}
					});
				}
			}
		});
	} catch (err) {
		console.log('err' + err);
	}
};

//Posting a vehicle
exports.userVehicle = async (req, res) => {
	let id_engine, id_vehicle_type, id_make;
	let err = false;
	console.log('Vehicle', req.body);
	const vehicle = new Vehicle({
		Licence: req.body.Licence,
		id_user: req.body.id_user,
		id_engine: null,
		id_vehicle_type: null,
		id_make: null,
	});
	//console.log(req.body.engine);
	await Engine.findOne({ name: req.body.engine }, function (error, result) {
		if (!error) {
			if (!result) {
				//return res.status(404).send('No engine found');
				err = true;
			}
			//console.log(result);
			id_engine = result._id;
		}
	});
	await Vehicle_Type.findOne(
		{ name: req.body.vehicle_type },
		function (error, result) {
			if (!error) {
				if (!result) {
					err = true;
					//res.status(404).send('No vehicle type found');
				}
				//console.log(result);
				id_vehicle_type = result._id;
			}

			//return id_vehicle_type;
		}
	);
	await Make.findOne({ name: req.body.make }, function (error, result) {
		if (!error) {
			if (!result) {
				err = true;
				//res.status(404).send('No maker found');
			}
			//console.log(result);
			id_make = result._id;
		}

		//return id_make;
	});

	vehicle.id_engine = id_engine;
	vehicle.id_vehicle_type = id_vehicle_type;
	vehicle.id_make = id_make;

	//if (!err) {
	await vehicle.save(function (error) {
		if (!error && !err) {
			console.log('Vehicle is added!!');
			res.status(201).send('Your vehicle has been added :)');
		} else {
			console.log('Something went wrong');
			throw error;
		}
	});
	//res.status(201).send('Your vehicle has been added :)');
	//}
};

/////GETTERS
//Function to get the list of vehicles makers
//https://stackoverflow.com/questions/24348437/mongoose-select-a-specific-field-with-find
exports.userMakes = async (req, res) => {
	query = Make.find({}).select({ name: 1, _id: 0 });
	await query.exec(function (error, result) {
		if (!error) {
			if (!result) {
				return res.status(500).send('No Data');
			}
			console.log(result);
			return res.json(result);
		}
	});
};

//Funticon to get the list of Engines
exports.userEngine = async (req, res) => {
	query = Engine.find({}).select({ name: 1, _id: 0 });
	await query.exec(function (error, result) {
		if (!error) {
			if (!result) {
				return res.status(500).send('No Data');
			}
			//console.log(result);
			return res.json(result);
		}
	});
};

//Function to get he list of Vehicles
exports.userVehicleType = async (req, res) => {
	query = Vehicle_Type.find({}).select({ name: 1, _id: 0 });
	await query.exec(function (error, result) {
		if (!error) {
			if (!result) {
				return res.status(500).send('No Data');
			}
			console.log(result);
			return res.json(result);
		}
	});
};

//Function to get the lsit of type services
exports.userServiceList = async (req, res) => {
	query = Service_Type.find().select({ name: 1, _id: 0 });
	await query.exec(function (error, result) {
		if (!error) {
			if (!result) {
				return res.status(500).send('No Data');
			}
			console.log(result);
			return res.json(result);
		}
	});
};

//Getting Users vehicle list
exports.vehicleList = async (req, res) => {
	console.log(req.params);
	await Vehicle.find({ id_user: req.params.id }, function (error, results) {
		if (error) return res.status(500).send(error);
		if (results.length == 0) {
			console.log('error');
			return res.status(500).send('This user has not registered cars');
		}
		console.log(results);
		return res.json(results);
	});
};

//Getting user service history
exports.userServiceHistory = async (req, res) => {
	console.log(req.params);
	await Vehicle.aggregate(
		[
			{
				$match: {
					id_user: mongoose.Types.ObjectId(req.params.id),
				},
			},
			{
				$lookup: {
					from: 'engines',
					localField: 'id_engine',
					foreignField: '_id',
					as: 'engines',
				},
			},
			{
				$lookup: {
					from: 'vehicle_types',
					localField: 'id_vehicle_type',
					foreignField: '_id',
					as: 'vehicle_types',
				},
			},
			{
				$lookup: {
					from: 'makes',
					localField: 'id_make',
					foreignField: '_id',
					as: 'makes',
				},
			},
			{
				$lookup: {
					from: 'bookings',
					localField: '_id',
					foreignField: 'id_vehicle',
					as: 'booking',
				},
			},
			{ $unwind: '$engines' },
			{ $unwind: '$makes' },
			{ $unwind: '$vehicle_types' },
			{ $unwind: '$booking' },
			{
				$group: {
					_id: {
						License: '$Licence',
						Engine: '$engines.name',
						Make: '$makes.name',
						Vehicle_type: '$vehicle_types.name',
						Date: '$booking.Date',
						Status: '$booking.Status',
						id_vehicle: '$_id',
					},
				},
			},
			{ $unwind: '$_id' },
		],
		function (error, results) {
			if (error) return res.status(500).send(error);
			if (results.length == 0) {
				console.log('error');
				return res.status(404).send('This user has not registered cars');
			}
			console.log(results);
			return res.json(results);
		}
	);
};
