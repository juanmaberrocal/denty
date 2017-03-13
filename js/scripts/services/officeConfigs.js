angular.module("dentyApp")
	.service("officeConfigs", [
		// list components
		"dentalOffice",
		"$rootScope", "$window", "dentyDebugger",
		function(dentalOffice, $rootScope, $window, dentyDebugger){
			"use strict";

			// set this for nested calls
			var self = this;

			/*========================
			define init functions here
			========================*/
			//
			function onOfficeLoad(response){
				dentyDebugger.console(response, onOfficeLoad, "info");

				// set office configurations
				var officeData = response.data;
				$rootScope.configs = officeData;

				// set title to office name
				_privateFunctions.setDocumentTitle();

				// set custom domain css
				_privateFunctions.setCustomCss();
				
				// display office webpage
				$rootScope.officeLoaded = true;
				$rootScope.loaderAllPageDisplay = false;
			}

			// 
			function onLoadError(response){
				dentyDebugger.console(response, onLoadError, "error");
			}

			/*===================
			define public methods
			===================*/
			// get domain of office visited  
			self.getOfficeDomain = function(){
				return $window.location.host.split(".")[0];
			};

			/*====================
			define private methods
			====================*/
			var _privateFunctions = {
				setDocumentTitle: function(){
					$window.document.title = $rootScope.configs.name + " | " + $window.document.title;
				},
				setCustomCss: function(){
					if ($rootScope.configs.custom_style){
						// build css link
						var cssLink = document.createElement("link");
						cssLink.href = "css/" + $rootScope.configs.custom_style + ".min.css";
						cssLink.rel = "stylesheet";


						// append custom css file
						$window.document.head.appendChild(cssLink);
					}
				}
			};

			/*===============================
			initialize configurations service
			===============================*/
			self.init = function(){
				// ensure office configurations are only loaded once
				if ($rootScope.officeLoaded){ return $rootScope.configs; }

				// display application loader
				$rootScope.loaderAllPageDisplay = true;
				$rootScope.officeLoaded = false;

				// load office configurations based on domain
				return dentalOffice.loadOffice(self.getOfficeDomain(),
					onOfficeLoad, 
					onLoadError);
			};
		}
	]);