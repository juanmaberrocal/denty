angular.module("dentyApp")
	.directive("loaderAllPage", [
		function(){
			"use strict";

			return {
				restrict: "E",
				templateUrl: "/templates/directives/loader_all_page.html"
			};
		}
	]);