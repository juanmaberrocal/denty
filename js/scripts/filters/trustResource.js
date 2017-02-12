angular.module("dentyApp")
	.filter("trustResource", [
		"$sce",
		function($sce){
			"use strict";

			// read html string and mark as trusted
			return function(resourcePath){
				return $sce.trustAsResourceUrl(resourcePath);
			};
		}
	]);