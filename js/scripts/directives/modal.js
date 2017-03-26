angular.module("dentyApp")
	.directive("modal", [
		"$rootScope", "dentyModal",
		function($rootScope, dentyModal){
			"use strict";

			return {
				restrict: "E",
				templateUrl: "/templates/directives/modal.html",
				scope: {},
				link: function($scope, element, attrs){
					var setModalData = function(){
						var modalData = dentyModal.getData();

						// set newest data to scope
						$scope.type = modalData.type;
						$scope.title = modalData.title;
						$scope.body = modalData.body;

						// digest
						$scope.$apply();
					};

					$rootScope.$on("showModal", function(){
						// update modal data
						setModalData();

						// display modal
						$(element).children(".modal").modal("show");
					});
				}
			};
		}
	]);