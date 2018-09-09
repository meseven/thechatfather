const redisClient = require('../redisClient');

function Rooms() {
	this.client = redisClient.getClient()
}

module.exports = new Rooms();

Rooms.prototype.upsert = function (roomName) {
	this.client.hset(
		'rooms',
		roomName,
		JSON.stringify({
			roomName,
			when: Date.now()
		}),
		err => {
			if (err) {
			  console.error(err);
			}
		}
	)
};
