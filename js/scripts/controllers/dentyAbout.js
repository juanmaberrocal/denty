angular.module("dentyApp")
	// define controller
	.controller("dentyAbout", [
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
				$scope.aboutLoaded = false;

				// load about configurations
				dentalOffice.loadAbout(office,
					onAboutLoad, 
					onLoadError);
			};

			function onAboutLoad(response){
				dentyDebugger.console(response, onAboutLoad, "info");

				// set about configurations
				angular.extend($scope, response.data);
				
				// display about page
				$scope.aboutLoaded = true;
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
			initialize 'about' page load
			**************************/
			self.init($rootScope.configs.domain);
		}
	]);