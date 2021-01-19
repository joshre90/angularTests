const db = require('../models');
const Booking = db.booking;
const TimeSlot = db.timeSlot;
const Make = db.make;
const Engine = db.engine;
const Vehicle_Type = db.vehicle_type;
const Vehicle = db.vehicle;

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
	let id_Booking;

	//Saving in the Booking Collection
	try {
		const booking = new Booking({
			First_name: req.body.First_name,
			Last_name: req.body.Last_name,
			Phone: req.body.Phone,
			Comments: req.body.Comments,
			Status: req.body.Status,
			Date: req.body.Date,
		});

		console.log(booking);
		id_Booking = booking.id;
		console.log(id_Booking);

		//Saves the Date and status in the Timeslot Collection. Returns an error if could not reach the DB
		idDate(bodyDate, Slot, id_Booking, (res) => {
			if (err) {
				return res.status(500).send('Error in the DB');
			}
		});
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
			if (result) {
				console.log(result);
				id_engine = result._id;
			} else {
				err = true;
			}
		}
	});
	await Vehicle_Type.findOne(
		{ name: req.body.vehicle_type },
		function (error, result) {
			if (!error) {
				if (result) {
					console.log(result);
					id_vehicle_type = result._id;
				} else {
					err = true;
					//res.status(404).send('No vehicle type found');
				}
			}

			//return id_vehicle_type;
		}
	);
	await Make.findOne({ name: req.body.make }, function (error, result) {
		if (!error) {
			if (result) {
				console.log(result);
				id_make = result._id;
			} else {
				err = true;
				//res.status(404).send('No maker found');
			}
		}

		//return id_make;
	});

	vehicle.id_engine = id_engine;
	vehicle.id_vehicle_type = id_vehicle_type;
	vehicle.id_make = id_make;

	if (!err) {
		await vehicle.save(function (error) {
			if (!error) {
				res.status(201).send('Vehicle saved');
			} else {
				throw error;
			}
		});
	} else {
		res.status(404).send('Data is missing');
	}
};

/////GETTERS
//Function to get the list of vehicles
exports.userMakes = async (req, res) => {
	await Make.find(function (error, result) {
		if (!error) {
			if (!result) {
				return res.status(500).send('No Data');
			}
			console.log(result);
			return res.json(result);
		}
	});
};

exports.userEngine = async (req, res) => {
	await Engine.find(function (error, result) {
		if (!error) {
			if (!result) {
				return res.status(500).send('No Data');
			}
			console.log(result);
			return res.json(result);
		}
	});
};

exports.userVehicleType = async (req, res) => {
	await Vehicle_Type.find(function (error, result) {
		if (!error) {
			if (!result) {
				return res.status(500).send('No Data');
			}
			console.log(result);
			return res.json(result);
		}
	});
};
