angular.module("dentyApp")
	.directive("headerNavBar", [
		function(){
			"use strict";

			return {
				restrict: "E",
				templateUrl: "/templates/directives/header_nav_bar.html"
			};
		}
	]);