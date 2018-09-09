const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = {
	io
};

// libs
const Users = require('./lib/Users');
const Rooms = require('./lib/Rooms');

// Socket authorization
io.use(socketAuthorization);

/**
 * Redis adapter
 */
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
	host: process.env.REDIS_URI,
	port: process.env.REDIS_PORT
}));

io.on('connection', socket => {
	console.log('a user logged in with name '+ socket.request.user.name);

	Users.upsert(socket.id, socket.request.user);

	Users.list(users => {
		io.emit('onlineList', users);
	});

	socket.on('newRoom', roomName => {
		Rooms.upsert(roomName);
	});

	socket.on('disconnect', () => {
		Users.remove(socket.request.user.googleId);

		Users.list(users => {
			io.emit('onlineList', users);
		});
	});
});


module.exports = socketApi;
