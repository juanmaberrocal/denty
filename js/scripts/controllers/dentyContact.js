angular.module("dentyApp")
	// define controller
	.controller("dentyContact", [
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
				$scope.contactLoaded = false;

				// load contact configurations
				dentalOffice.loadContact(office,
					onContactLoad, 
					onLoadError);
			};

			function onContactLoad(response){
				dentyDebugger.console(response, onContactLoad, "info");

				// check map has to be displayed and api is available
				if (response.data.show_map && $rootScope.configs.google_api){
					// build google map url
					response.data.map_url = [
						"https://www.google.com/maps/embed/v1/place?key=",
						$rootScope.configs.google_api,
						"&q=",
						($rootScope.configs.contact_address.replace(/\s/g, "+"))
					].join("");
				}

				// set contact configurations
				angular.extend($scope, response.data);
				
				// display contact page
				$scope.contactLoaded = true;
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
			initialize 'contact' page load
			**************************/
			self.init($rootScope.configs.domain);
		}
	]);