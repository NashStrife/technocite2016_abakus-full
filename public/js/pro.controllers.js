var abakusControllers = angular.module('proControllers', []);



// add the "Rest" service inside the diferent Ctrl
abakusControllers.controller('ProListCtrl', ['$scope', 'Client', function($scope, Client){

	// create a function to refresh the list when needed
	function refresh() {
		Client.getList(function(result){
			// prepare some var
			$scope.listClients = result;
			$scope.listBills = [];
			$scope.listEstimates = [];

			result.map(function(item){
				// console.log(item.bills);
				// store list of bills for easy use inside html
				item.bills.map(function(bill){
					// console.log(bill);
					// add customer name to result to avoid some tricky manipulations inside html
					
					$scope.listBills.push(bill);
					$scope.listBills.clientName = item.name
					$scope.listBills.clientId = item._id;
				});
				// same with estimates
				item.quotations.map(function(estimate){
					// console.log(estimate);
					estimate.clientName = item.name
					estimate.clientId = item._id;
					$scope.listEstimates.push(estimate);
				});
			});
			console.log("Clients :");
			console.log($scope.listClients);
			console.log("Factures :");
			console.log($scope.listBills);
			console.log("Devis :");
			console.log($scope.listEstimates);
		});
	}

	// need to use refresh() at first list loading
	refresh();
	
	// define the base order when list appear
	$scope.order = "createdAt";
	$scope.direction = "reverse";
}]);

abakusControllers.controller('ProDetailCtrl', ['$scope', '$routeParams', 'Client', function($scope, $routeParams, Client){
	Client.getList(function(result){
		// get list of clients
		$scope.clients = result;
		// get the item that we want details thx to the id sent in the route
		$scope.whichItem = $routeParams.itemId;
		console.log($scope.clients[$scope.whichItem]);

		$scope.nextItem = parseInt($scope.whichItem) + 1;
		// get back to the begining of the loop
		if($scope.nextItem >= $scope.clients.length){
			$scope.nextItem = 0;
		}

		// go to the end of the loop
		$scope.prevItem = parseInt($scope.whichItem) - 1;
		if($scope.prevItem < 0){
			$scope.prevItem = $scope.clients.length-1;
		}
	});
}]);

abakusControllers.controller('ProAccountCtrl', ['$scope', '$routeParams', 'Admin', function($scope, $routeParams, Admin){
	Admin.getAdmin(function(result){
		// get first tab of the array because we have only one admin
		$scope.details = result[0];
		console.log($scope.details);

	});
}]);