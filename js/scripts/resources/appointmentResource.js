angular.module("dentyApp")
	.factory("appointment", [
		"$http", "$rootScope", "dentyDebugger",
		function($http, $rootScope, dentyDebugger){
			"use strict";

			// define factory
			var self = this,
				appointment = {
					post: submitAppointment
				};

			// return factory
			return appointment;

			/*===============================
			define all factory services here:
			===============================*/
			/*
			@description: submit appointment form data
			@data: form inputs as a json object (ng-model)
			*/
			function submitAppointment(data, successCallback, errorCallback){
				return $http
					.post("/api/v1/appointments.php", 
						$.extend(data, {
							// pass along domain of current office
							domain: $rootScope.configs.domain
						})
					)
					.then(
						function(data){ // success handler
							if (successCallback){
								successCallback(data);
							} else {
								// if no success callback is defined
								// display success in console
								dentyDebugger.console(data, submitAppointment, "info");
							}
						},
						function(data){ // error handler
							if (errorCallback){
								errorCallback(data);
							} else {
								// if no error callback is defined
								// display errors in console
								dentyDebugger.console(data, submitAppointment, "error");
							}
						}
					);
			}
		}
	]);