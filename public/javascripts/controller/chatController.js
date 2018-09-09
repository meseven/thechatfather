app.controller('chatController', ['$scope', ($scope) => {
	$scope.onlineList = [];
	$scope.activeTab = 2;

	const socket = io.connect("http://localhost:3000");
	socket.on('onlineList', users => {
		$scope.onlineList = users;
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
