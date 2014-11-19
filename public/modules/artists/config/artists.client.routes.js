'use strict';

//Setting up route
angular.module('artists').config(['$stateProvider',
	function($stateProvider) {
		// Artists state routing
		$stateProvider.
		state('artists', {
			url: '/artists',
			templateUrl: 'modules/artists/views/artists.client.view.html'
		}).
		state('viewartist', {
			url: '/myartists/viewartist',
			templateUrl: 'modules/artists/views/viewartist.client.view.html'
		}).
		state('myartists', {
			url: '/myartists',
			templateUrl: 'modules/artists/views/myartists.client.view.html'
		}).
		state('discover', {
			url: '/myartists/discover',
			templateUrl: 'modules/artists/views/discover.client.view.html'
		});
	}
]);