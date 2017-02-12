angular.module("dentyApp")
	.service("dentyDebugger", [
		"$rootScope",
		function($rootScope){
			"use strict";

			// set this for nested calls
			var self = this;

			// turn debugger on/off
			self.debugging = true;

			// print out console messages
			self.console = function(msg, context, type){
				// only print if debugging enabled
				if (!self.debugging){ return; }

				switch (type){
					case "info":
						console.info(msg, context);
						break;
					case "warn":
						console.warn(msg, context);
						break;
					case "error":
						console.error(msg, context);
						break;
					default:
						console.log(msg, context);
						break;
				}
			};
		}
	]);