'use strict';

/* Controllers */

function MenuCtrl($scope, $cookies) {
	$scope.userLoggedIn = 0;	
	$scope.$on('loggedin', function(data) {
		if(data){
			$scope.userLoggedIn = 1;	
		}
		$scope.$on('logout', function(){
        $scope.userLoggedIn = 0;
		}); 	 		
	});
}

function LoginCtrl($scope, UserDatabase, $cookies, $rootScope) {

	$scope.memberLogin = function() {
		$scope.member = UserDatabase.get({username:$scope.member.username, password:$scope.member.password},
	         function(data){
	            if (data.user) {
	            	$cookies.user = $scope.member.user;
	            	$cookies.fullname = $scope.member.fullname;
            		$rootScope.$broadcast('loggedin', $cookies.user);
	            	window.location.href ='#/favorites';
	            }
	            else {
	            	$scope.member.loginErr = 'Incorrect Username/Password';
	            }
	        });
	}

	$scope.memberSignUp = function() {
		UserDatabase.get({username:$scope.newmember.username},
	         function(data){
	           if (data.user) {
	            	$scope.newmember.signupErr = 'Username already exists';
	           }
	           else {
	           	    //create a new member
	           	    var pobject = new UserDatabase(); 
	           	    pobject.username = $scope.newmember.username; 
	           	    pobject.password = $scope.newmember.password; 
	           	    pobject.fullname = $scope.newmember.fullname;
	           	    pobject.email = $scope.newmember.email; 
	           	    pobject.$save();
	            	$cookies.user = $scope.newmember.username;
	            	$cookies.fullname = $scope.member.fullname;
	            	$rootScope.$broadcast('loggedin', $cookies.user);
	            	window.location.href ='#/favorites';	            	 
	           }
	       });
	}
}

function FavoritesCtrl($scope, $cookies, FavoritesDatabase) {
	$scope.user = $cookies.user;
	$scope.favorites = FavoritesDatabase.query({username: $cookies.user});
}

function ActivitiesCtrl($scope, ActivityDatabase, FavoritesDatabase, $cookies) {
	$scope.activities = ActivityDatabase.query();	

	$scope.favoriteItem = function(id) {
			var saveObject = new FavoritesDatabase(); 
       	    saveObject.id_entries = id; 
       	    saveObject.user =  $cookies.user; 
       	    saveObject.$save();
	}
}

function PostCtrl($scope) {

}

function LogoutCtrl($cookies, $rootScope) {
	delete $cookies.user;
	delete $cookies.fullname;
	$rootScope.$broadcast('logout', 'logged out');
	window.location.href = '#/login';
}