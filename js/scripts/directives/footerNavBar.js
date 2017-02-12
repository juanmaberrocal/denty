angular.module("dentyApp")
	.directive("footerNavBar", [
		function(){
			"use strict";

			return {
				restrict: "E",
				templateUrl: "/templates/directives/footer_nav_bar.html"
			};
		}
	]);