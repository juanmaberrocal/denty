angular.module("dentyApp")
	// define controller
	.controller("dentyServices", [
		// list components
		"dentalOffice",
		"$scope", "$rootScope", "dentyDebugger",
		function(dentalOffice, $scope, $rootScope, dentyDebugger){
			"use strict";

			// set for nested calls
			var self = this;

			/*=========================
			define init functions here:
			=========================*/
			self.init = function(office){
				// display loader until data is gathered
				$rootScope.loaderAllBodyDisplay = true;
				$scope.homeLoaded = false;

				// load home configurations
				dentalOffice.loadHome(office,
					onHomeLoad, 
					onLoadError);
			};

			function onHomeLoad(response){
				dentyDebugger.console(response, onHomeLoad, "info");

				// set home configurations
				angular.extend($scope, response.data);
				
				// display home page
				$scope.homeLoaded = true;
				$rootScope.loaderAllBodyDisplay = false;
			}

			function onLoadError(response){
				dentyDebugger.console(response, onLoadError, "error");
			}

			/**************************
			initialize 'home' page load
			**************************/
			self.init($rootScope.configs.domain);
		}
	]);