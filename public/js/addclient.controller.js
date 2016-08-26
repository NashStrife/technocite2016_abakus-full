var addClientModule = angular.module('addClientModule', []);


addClientModule.controller('addClientCtrl', ['$scope', '$location', 'Param','Client', 'Crm', function($scope, $location, Param, Client, Crm) {
    $scope.showForm = false;
	$scope.splash = function(status) {
       $scope.showForm = status;
      };
    $scope.newClient = {};
    $scope.newClient.deliveryInfo = {};
    
    $scope.moreClient = function(isValid) {
        console.log($scope.newClient);
        if($scope.newClient.isCompany == false) {
                $scope.newClient.name = $scope.newClient.contactPerson.lastname + $scope.newClient.contactPerson.firstname;
                if(isValid){     
                    Client.addClient($scope.newClient, function(result){
					console.log(result);
                    $scope.newClient.contactPerson.pwd = "pass123";

					// clean the temp Arrays after sending the form for the next one
					$scope.newClient = {};
                    $scope.splash(false);
                    $location.path('/pro/clients/list');
				});
				$scope.error = false;
			} else {
				console.log("Invalid Submit !");
				alert("Please complete all required champs");
				$scope.error = true;
			}
        }
        
            
            // if($scope.newClient.isCompany){
            //     $scope.newClient.vat.num = $scope.newClient.prevat.num + $scope.newClient.vat.num;
            // }
            // let profileImage = {
            //             "folder": "public/images/clients/profile",
            //             "filename": $scope.newClient.name,
            //             "file": $scope.newClient.picture
            //         };
            //         Crm.upload(profileImage, function(result){
            //             console.log(result);
            //         });
           
    };
    Param.getList(function(result){
	    $scope.param = result;
        console.log($scope.param);
	});
    $scope.checkDelivery = function (value) {
        //console.log($event);
        // console.log(value);
        if($scope.newClient.billingInfo) {
            if(value) {
                $scope.newClient.deliveryInfo.civility = $scope.newClient.billingInfo.civility; 
                $scope.newClient.deliveryInfo.lastname = $scope.newClient.billingInfo.lastname; 
                $scope.newClient.deliveryInfo.firstname = $scope.newClient.billingInfo.firstname;
                $scope.newClient.deliveryInfo.street = $scope.newClient.billingInfo.street;
                $scope.newClient.deliveryInfo.number = $scope.newClient.billingInfo.number;
                $scope.newClient.deliveryInfo.box = $scope.newClient.billingInfo.box;
                $scope.newClient.deliveryInfo.zip = $scope.newClient.billingInfo.zip;
                $scope.newClient.deliveryInfo.town = $scope.newClient.billingInfo.town;
                $scope.newClient.deliveryInfo.country = $scope.newClient.billingInfo.country;
            }
            else {
                $scope.newClient.deliveryInfo.civility = "";
                $scope.newClient.deliveryInfo.lastname = ""; 
                $scope.newClient.deliveryInfo.firstname = "";
                $scope.newClient.deliveryInfo.street = "";
                $scope.newClient.deliveryInfo.number = "";
                $scope.newClient.deliveryInfo.box = "";
                $scope.newClient.deliveryInfo.zip = "";
                $scope.newClient.deliveryInfo.town = "";
                $scope.newClient.deliveryInfo.country = "";
            }
        }
    };
}]);