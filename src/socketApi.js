const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = {
	io
};

// libs
const Users = require('./lib/Users');
const Rooms = require('./lib/Rooms');
const Messages = require('./lib/Messages');

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

	Rooms.list(rooms => {
		io.emit('roomList', rooms);
	});

	Users.upsert(socket.id, socket.request.user);

	Users.list(users => {
		io.emit('onlineList', users);
	});

	socket.on('newMessage', data => {
		const messageData = {
			...data,
			userId: socket.request.user._id,
			username: socket.request.user.name,
			surname: socket.request.user.surname,
		};

		Messages.upsert(messageData);
		socket.broadcast.emit('receiveMessage', messageData);
	});

	socket.on('newRoom', roomName => {
		Rooms.upsert(roomName);
		Rooms.list(rooms => {
			io.emit('roomList', rooms);
		});
	});

	socket.on('disconnect', () => {
		Users.remove(socket.request.user._id);

		Users.list(users => {
			io.emit('onlineList', users);
		});
	});
});

module.exports = socketApi;
