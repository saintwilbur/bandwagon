'use strict';

//Setting up route
angular.module('gags').config(['$stateProvider',
	function($stateProvider) {
		// Gags state routing
		$stateProvider.
		state('gags', {
			url: '/gags',
			templateUrl: 'modules/gags/views/gags.client.view.html'
		});
	}
]);