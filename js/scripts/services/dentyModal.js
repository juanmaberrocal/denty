angular.module("dentyApp")
	.service("dentyModal", [
		"$rootScope",
		function($rootScope){
			"use strict";

			// set this for nested calls
			var modalData = {
				type: "",
				title: "",
				body: ""
			};

			/*
			description: set new modal data to be rendered
			@data: { type: Sting, title: String, body: String }
			*/
			this.setData = function(data){
				modalData = data;
			};

			/*
			description: return latest modal data set
			@return: { type: Sting, title: String, body: String }
			*/
			this.getData = function(){
				return modalData;
			};

			/*
			description: trigger call for modal directive to upate modal html and display
			*/
			this.showModal = function(){
				$rootScope.$emit("showModal");
			};
		}
	]);