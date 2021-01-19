const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const Role = db.role;
const TimeSlot = db.timeSlot;
const Booking = db.booking;
var config = require('./config/config');
var mongoose = require('mongoose');

const app = express();

var corsOptions = {
	origin: 'http://localhost:8100',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to the application.' });
});

mongoose
	.connect(config.db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})

	//const connection = mongoose.connection;

	.then(() => {
		console.log('Successfully connect to MongoDB.');
		initial();
	})
	.catch((err) => {
		console.error('Connection error', err);
		process.exit();
	});

/* 
function populate() {
	var d = new Date();
	console.log(d);
	var d2 = new Date();

	now = d.getUTCDate();
	console.log(now);

	var dd = d2.getDate();
	console.log(dd);

	for (i = 0; i < 5; i++) {
		d2.setDate(d2.getDate() + 1);
		console.log(d2);
		mdate = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate();
		console.log(mdate);

		// Setup stuff
		var query = {
				Date: mdate,
			},
			update = { Date: mdate },
			options = { upsert: true };

		TimeSlot.findOneAndUpdate(query, update, options, function (error, result) {
			if (!error) {
				// If the document doesn't exist
				if (!result) {
					// Create it
					console.log('Not result found');
					result = new TimeSlot({
						Date: mdate,
					});
				} else {
					// Save the document
					console.log('result was found');
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
	}

	//TimeSlot.((element) => {
	//	console.log('Element', element.Date);
	//}); 

	// Setup stuff
	var query = {
			Date: '2021-01-24',
		},
		update = { Date: '2021-02-24' },
		options = { upsert: true };

	// Find the document
	TimeSlot.findOneAndUpdate(query, update, options, function (error, result) {
		if (!error) {
			// If the document doesn't exist
			if (!result) {
				// Create it
				console.log('Not result found');
				result = new TimeSlot({});
			} else {
				// Save the document
				console.log('result was found');
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
} 
*/

function initial() {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: 'user',
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}

				console.log("added 'user' to roles collection");
			});

			new Role({
				name: 'moderator',
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}

				console.log("added 'moderator' to roles collection");
			});

			new Role({
				name: 'admin',
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}

				console.log("added 'admin' to roles collection");
			});
		}
	});
}

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
