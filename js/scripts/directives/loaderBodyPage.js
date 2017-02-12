angular.module("dentyApp")
	.directive("loaderBodyPage", [
		function(){
			"use strict";

			return {
				restrict: "E",
				templateUrl: "/templates/directives/loader_body_page.html"
			};
		}
	]);