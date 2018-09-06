const socketio = require('socket.io');

const io = socketio();

const socketApi = {
	io
};

io.on('connection', socket => {
	console.log('a user logged in');
});


module.exports = socketApi;
