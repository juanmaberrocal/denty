angular.module("dentyApp")
	.directive("footerBanner", [
		function(){
			"use strict";

			return {
				restrict: "E",
				templateUrl: "/templates/directives/footer_banner.html"
			};
		}
	]);