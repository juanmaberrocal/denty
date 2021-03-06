angular.module("dentyApp")
	.directive("pageHeader", [
		function(){
			"use strict";

			return {
				restrict: "E",
				templateUrl: "/templates/directives/page_header.html",
				scope: {
					title: "@",
					has_image: "=hasImage",
					image_name: "@imageName",
					image_source: "@imageSource"
				}
			};
		}
	]);