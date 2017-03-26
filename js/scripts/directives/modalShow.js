angular.module("dentyApp")
	.directive("modalShow", [
		"dentyModal",
		function(dentyModal){
			"use strict";

			return {
				restrict: "A",
				scope: {
					"modal_type": "@modalType",
					"modal_title": "@modalTitle",
					"modal_body": "@modalBody"
				},
				link: function($scope, element, attrs){
					// bind click  to set data and display modal
					element.on("click", function(){
						// set modal data based on directive attributes
						dentyModal.setData({
							type: $scope.modal_type,
							title: $scope.modal_title,
							body: $scope.modal_body
						});

						// trigger modal show
						dentyModal.showModal();
					});
				}
			};
		}
	]);