angular.module("dentyApp")
	// define controller
	.controller("dentyOffers", [
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
				$scope.offersLoaded = false;

				// load offers configurations
				dentalOffice.loadOffers(office,
					onOffersLoad, 
					onLoadError);
			};

			function onOffersLoad(response){
				dentyDebugger.console(response, onOffersLoad, "info");

				// set offers configurations
				angular.extend($scope, response.data);
				
				// display offers page
				$scope.offersLoaded = true;
				$rootScope.loaderAllBodyDisplay = false;
			}

			function onLoadError(response){
				dentyDebugger.console(response, onLoadError, "error");
			}

			/**************************
			initialize 'offers' page load
			**************************/
			self.init($rootScope.configs.domain);
		}
	]);