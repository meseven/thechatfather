const mongoose = require('mongoose');

module.exports = () => {
	mongoose.connect(process.env.DB_STRING);

	mongoose.connection.on('open', () => {
		// console.log('MongoDB: Connected');
	});
	mongoose.connection.on('error', (err) => {
		console.log('MongoDB: Error', err);
	});

	mongoose.Promise = global.Promise;
};
