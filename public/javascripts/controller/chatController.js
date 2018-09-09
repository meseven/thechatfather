app.controller('chatController', ['$scope', ($scope) => {
	/**
	 * Angular variables
	 */
	$scope.onlineList = [];
	$scope.roomList = [];
	$scope.activeTab = 2;

	/**
	 * Socket.io event handling.
	 */
	const socket = io.connect("http://localhost:3000");
	socket.on('onlineList', users => {
		$scope.onlineList = users;
		$scope.$apply();
	});

	socket.on('roomList', rooms => {
		$scope.roomList = rooms;
		$scope.$apply();
	});


	$scope.newRoom = () => {
		let randomName = Math.random().toString(36).substring(7);
		socket.emit('newRoom', randomName);
	};

	$scope.changeTab = tab => {
		$scope.activeTab = tab;
	};
}]);
