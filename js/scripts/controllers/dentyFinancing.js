angular.module("dentyApp")
	// define controller
	.controller("dentyFinancing", [
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
				$scope.financingLoaded = false;

				// load financing configurations
				dentalOffice.loadFinancing(office,
					onFinancingLoad, 
					onLoadError);
			};

			function onFinancingLoad(response){
				dentyDebugger.console(response, onFinancingLoad, "info");

				// set financing configurations
				angular.extend($scope, response.data);
				
				// display financing page
				$scope.financingLoaded = true;
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
			initialize 'financing' page load
			**************************/
			self.init($rootScope.configs.domain);
		}
	]);