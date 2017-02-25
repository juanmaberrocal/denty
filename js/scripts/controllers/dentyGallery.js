angular.module("dentyApp")
	// define controller
	.controller("dentyGallery", [
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
				$scope.galleryLoaded = false;

				// load gallery configurations
				dentalOffice.loadGallery(office,
					onGalleryLoad, 
					onLoadError);
			};

			function onGalleryLoad(response){
				dentyDebugger.console(response, onGalleryLoad, "info");

				// set gallery configurations
				angular.extend($scope, response.data);
				
				// display gallery page
				$scope.galleryLoaded = true;
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
			initialize 'gallery' page load
			**************************/
			self.init($rootScope.configs.domain);
		}
	]);