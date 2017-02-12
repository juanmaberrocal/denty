angular.module("dentyApp")
	.filter("trustUrl", [
		"$sce",
		function($sce){
			"use strict";

			// read html string and mark as trusted
			return function(urlPath){
				return $sce.trustAsUrl(urlPath);
			};
		}
	]);