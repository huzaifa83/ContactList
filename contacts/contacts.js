'use strict';

angular.module('myApp.contacts', ['ngRoute'])

.config(['$routeProvider',  function($routeProvider ) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('FBCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

 
   
  
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

   // alert('a');
 
   var ref =  fb.database().ref();
   $scope.contacts = $firebaseArray(ref);

	$scope.addFormShow = true;
	$scope.editFormShow = false;

	$scope.showEditForm = function(contact){
		$scope.addFormShow = false;
		$scope.editFormShow = true;

		$scope.id = contact.$id;
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.phone = contact.phone;
	}
	$scope.addContact = function(){
		console.log('Adding Contact..');
		$scope.contacts.$add({
			name: $scope.name,
			email:$scope.email,
			phone: $scope.phone 
		  }).then(function(){
		  		//var id = ref.key();
		  		console.log('yo baby' );
		  
		  $scope.name = '';
		  $scope.email = '';
		  $scope.phone = '';
		  });	
	}

	$scope.editContact = function(contact){
		var id = $scope.id;
		
		var record = $scope.contacts.$getRecord(id);
		
		record.name = $scope.name;
		record.email = $scope.email;
		record.phone = $scope.phone;
		
		//Save
		$scope.contacts.$save(record).then(function(ref){
			console.log(ref.key);
		});

		  $scope.name = '';
		  $scope.email = '';
		  $scope.phone = '';
	}

	$scope.removeContact = function(contact){
		$scope.contacts.$remove(contact);
	}

}]);