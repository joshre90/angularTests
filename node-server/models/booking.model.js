const mongoose = require('mongoose');

const Booking = mongoose.model(
	'Booking',
	new mongoose.Schema({
		First_name: String,
		Last_name: String,
		Phone: Number,
		Comments: String,
		Status: String,
		Date: String,

		id_costumer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		id_mechanic: { type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic' },
		id_tservice: { type: mongoose.Schema.Types.ObjectId, ref: 'Type_Service' },
	})
);

module.exports = Booking;
