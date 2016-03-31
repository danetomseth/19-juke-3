'use strict';

var juke = angular.module('juke', ['ui.router']);

juke.run(function ($rootScope) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error('Error transitioning from ' + fromState + ' to ' + toState + ':', error);
  });
});


juke.config(function($urlRouterProvider) {
	$urlRouterProvider.when('', '/albums')
})


juke.config(function($urlRouterProvider) {
	$urlRouterProvider.when(/artist\/[\w]*$/, function($match, $state) {
		$state.go('artistList.albums')
	});
})

juke.config(["$locationProvider", function ($locationProvider) {
	$locationProvider.html5Mode(true);
}])