'use strict';


// Declare app level module which depends on filters, and services
//angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  
var sbdApp = angular.module('sbdApp', ['services', 'ngCookies']);

sbdApp.config(['$routeProvider', function($routeProvider) {
$routeProvider.    
    when('/login', {templateUrl: 'partials/login.html', controller: LoginCtrl}).
    when('/activities', {templateUrl: 'partials/activities.html', controller: ActivitiesCtrl}).
    when('/favorites', {templateUrl: 'partials/favorites.html', controller: FavoritesCtrl}).
    when('/post/', {templateUrl: 'partials/post.html', controller: PostCtrl}).    
    when('/logout', {templateUrl: 'partials/logout.html', controller: LogoutCtrl}).
    otherwise({redirectTo: '/login'});
   

  }]);




