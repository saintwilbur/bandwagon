'use strict';

//Setting up route
angular.module('gigs').config(['$stateProvider',
	function($stateProvider) {
		// Gigs state routing
		$stateProvider.
		state('gigs', {
			url: '/gigs',
			templateUrl: 'modules/gigs/views/gigs.client.view.html'
		});
	}
]);