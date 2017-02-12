angular.module("dentyApp")
	.directive("pageTitleDescription", [
		function(){
			"use strict";

			return {
				restrict: "E",
				templateUrl: "/templates/directives/page_title_description.html",
				scope: {
					title: "@",
					description: "@"
				}
			};
		}
	]);