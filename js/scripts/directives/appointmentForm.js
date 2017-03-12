angular.module("dentyApp")
	.directive("appointmentForm", [
		"appointment", "$timeout", "dentyDebugger",
		function(appointment, $timeout, dentyDebugger){
			"use strict";

			return {
				restrict: "E",
				templateUrl: "/templates/directives/appointment_form.html",
				scope: {
					direct_confirm: "@directConfirm"
				},
				link: function($scope, element, attrs){
					/*=================================
					define form model constructors here
					=================================*/
					function initializeFormModel(){
						return {
							// message flag
							directConfirm: $scope.direct_confirm,
							// form fields
							name: null,
							date: null,
							time: null,
							treatment: "",
							phone: null,
							email: null
						};
					}

					// scope wrapper for: initializeFormModel
					function newFormModel(){
						// resets form model using initialize function
						$scope.model = initializeFormModel();
					}

					/*======================
					define form methods here
					======================*/
					// clean form by setting form & fields as pristine and untouched
					function newForm(){
						$scope.errorMsg = null;
						$scope.form.$setPristine();
						$scope.form.$setUntouched();
						// clear each input field
						for (var field in initializeFormModel()){
							if (typeof $scope.form[field] !== "undefined"){
								$scope.form[field].$setPristine();
								$scope.form[field].$setUntouched();
							}
						}

						// set the available treatment options for select
						// todo: load available treatments (on demand or from initial office configs)
						$scope.treatments = $scope.treatments || [
							{ value: "cleaning", label: "Cleaning" },
							{ value: "whitening", label: "Whitening" },
							{ value: "braces", label: "Braces" },
							{ value: "other", label: "Other" }
						];
					}

					// set fields as touched
					function touchForm(){
						for (var field in initializeFormModel()){
							if (typeof $scope.form[field] !== "undefined"){
								$scope.form[field].$setTouched();
							}
						}
					}

					// display form complete message
					// todo

					// hide form complete message
					function hideCompleteMessage(){
						$timeout(function(){
							$scope.formComplete = false;
							$scope.completeStatus = null;
							$scope.completeMsg = "";
						}, 5000);
					}

					// handle successful submissions
					function formSubmitSuccess(response){
						dentyDebugger.console(response, formSubmitSuccess, "info");

						// build confirmation message
						$scope.formComplete = true;
						$scope.completeStatus = "success";
						$scope.completeMsg = "Thank you for booking your appointment.\n\nPlease expect a confirmation email!";

						// set timeout to hide confirmation
						hideCompleteMessage();

						// reset form model and form
						newFormModel(); 
						newForm();
					}

					// handle error submissions
					function formSubmitError(response){
						// handle type of error
						if (response.status === 503){
							// appointment created but no confirmation email sent
							dentyDebugger.console(response, formSubmitError, "warn");

							// build warning message
							$scope.formComplete = true;
							$scope.completeStatus = "warning";
							$scope.completeMsg = "A confirmation could not be generated.\n\nPlease contact the office directly to confirm your appointment!";

							// set timeout to hide warning
							hideCompleteMessage();

							// reset form model and form
							newFormModel();
							newForm();
						} else {
							// no record created 
							dentyDebugger.console(response, formSubmitError, "error");
							$scope.errorMsg = "There was an error submitting your appointment";

							// reset form submitted status
							$scope.form.$submitted = false;
						}
					}

					/*========================
					define public methods here
					========================*/
					$scope.init = function(){
						// build form model and form
						newForm();
						newFormModel();

						// bind cancel button to clear form and close
						element.on("click", "button#cancel-appointment", function(ev){
							// close form before clearing values
							$(element).closest("li.dropdown").removeClass("open");

							// reset form model and form
							$scope.$apply(function(){ 
								newFormModel(); 
								newForm(); 
							});
						});
					};

					$scope.submit = function(model){
						// get form model
						model = model || $scope.model;
						dentyDebugger.console(model, $scope.submit, "info");

						// touch form to trigger validation classes
						touchForm();

						// check form validity
						if ($scope.form.$valid){
							// if form is valid send submission
							appointment.post(model, formSubmitSuccess, formSubmitError);
						} else {
							// if form is not valid display error
							dentyDebugger.console($scope.form.$error, $scope.submit, "error");
							$scope.errorMsg = "Please fill out all the fields";
							
							// reset form submitted status
							$scope.form.$submitted = false;
						}
					};

					/**************************
					initialize appointment form
					**************************/
					$scope.init();
				}
			};
		}
	]);