angular.module("dentyApp")
	.directive("errorBodyPage", [
		function(){
			"use strict";

			return {
				restrict: "E",
				templateUrl: "/templates/directives/error_body_page.html"
			};
		}
	]);