'use strict';

angular.module('users').controller('IntegrationsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		// Integrations controller logic
		// ...

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are linked music accounts
        //this is terrible.
		$scope.hasConnectedMusicAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
        };

        // Check if provider is already in use with current user
		$scope.isConnectedMusicAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

        $scope.removeUserMusicAccount = function(provider) {
            $scope.success = $scope.error = null;

            $http.delete('/users/accounts', {
                params: {
                    provider: provider
                }
            }).success(function(response) {
                // If successful show success message and clear form
                $scope.success = true;
                $location.path('/#!/integrations');
                //$scope.user = Authentication.user = response;
            }).error(function(response) {
                $scope.error = response.message;

            });
        };
	}
]);