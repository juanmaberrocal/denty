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
				$rootScope.loaderBodyDisplay = true;
				$rootScope.errorBodyDisplay = false;
				$scope.servicesLoaded = false;

				// load services configurations
				dentalOffice.loadServices(office,
					onServicesLoad, 
					onLoadError);
			};

			function onServicesLoad(response){
				dentyDebugger.console(response, onServicesLoad, "info");

				// set services configurations
				angular.extend($scope, response.data);
				
				// display services page
				$scope.servicesLoaded = true;
				$rootScope.loaderBodyDisplay = false;
				$rootScope.errorBodyDisplay = false;
			}

			function onLoadError(response){
				dentyDebugger.console(response, onLoadError, "error");

				// display error
				$rootScope.loaderBodyDisplay = false;
				$rootScope.errorBodyDisplay = true;
			}

			/**************************
			initialize 'services' page load
			**************************/
			self.init($rootScope.configs.domain);
		}
	]);