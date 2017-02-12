angular.module("dentyApp")
	.filter("trustHtml", [
		"$sce",
		function($sce){
			"use strict";

			// read html string and mark as trusted
			return function(htmlCode){
				return $sce.trustAsHtml(htmlCode);
			};
		}
	]);