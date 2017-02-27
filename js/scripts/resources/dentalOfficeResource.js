angular.module("dentyApp")
	.factory("dentalOffice", [
		"$http", "$rootScope", "dentyDebugger",
		function($http, $rootScope, dentyDebugger){
			"use strict";

			// define factory
			var self = this,
				dentalOffice = {
					loadOffice: loadOffice,
					loadHome: loadHomePage,
					// 
					loadAbout: loadAboutPage,
					loadServices: loadServicesPage,
					loadGallery: loadGalleryPage,
					loadOffers: loadOffersPage,
					//
					loadContact: loadContactPage,
					loadFinancing: loadFinancingPage
				};

			// return factory
			return dentalOffice;

			/*===============================
			define all factory services here:
			===============================*/
			/*
			@description: load configurations and settings for a specific dental office
			@office: domain name of dental office
			*/
			function loadOffice(office, successCallback, errorCallback){
				return $http
					.get("/api/v1/dental_office.php", 
						{ params: {domain: office} }
					)
					.then(
						function(data){ // success handler
							if (successCallback){
								successCallback(data);
							} else {
								// if no success callback is defined
								// display success in console
								dentyDebugger.console(data, loadOffice, "info");
							}
						},
						function(data){ // error handler
							if (errorCallback){
								errorCallback(data);
							} else {
								// if no error callback is defined
								// display errors in console
								dentyDebugger.console(data, loadOffice, "error");
							}
						}
					);
			}

			/*
			@description: load "home" page data
			@office: domain of office being displayed
			*/
			function loadHomePage(office, successCallback, errorCallback){
				return $http
					.get("/api/v1/home_page.php",
						{ params: {domain: office} }
					)
					.then(
						function(data){ // success handler
							if (successCallback){
								successCallback(data);
							} else {
								// if no success callback is defined
								// display success in console
								dentyDebugger.console(data, loadHomePage, "info");
							}
						},
						function(data){ // error handler
							if (errorCallback){
								errorCallback(data);
							} else {
								// if no error callback is defined
								// display errors in console
								dentyDebugger.console(data, loadHomePage, "error");
							}
						}
					);
			}

			/*
			@description: load "about" page data
			@office: domain of office being displayed
			*/
			function loadAboutPage(office, successCallback, errorCallback){
				// prevent malicious queries if current office does not have a home page configured
				if (!$rootScope.configs.has_about){
					dentyDebugger.console(office, loadAboutPage, "error");
				}

				return $http
					.get("/api/v1/about_page.php",
						{ params: {domain: office} }
					)
					.then(
						function(data){ // success handler
							if (successCallback){
								successCallback(data);
							} else {
								// if no success callback is defined
								// display success in console
								dentyDebugger.console(data, loadAboutPage, "info");
							}
						},
						function(data){ // error handler
							if (errorCallback){
								errorCallback(data);
							} else {
								// if no error callback is defined
								// display errors in console
								dentyDebugger.console(data, loadAboutPage, "error");
							}
						}
					);
			}

			/*
			@description: load "services" page data
			@office: domain of office being displayed
			*/
			function loadServicesPage(office, successCallback, errorCallback){
				// prevent malicious queries if current office does not have a services page configured
				if (!$rootScope.configs.has_services){
					dentyDebugger.console(office, loadServicesPage, "error");
				}

				return $http
					.get("/api/v1/services_page.php",
						{ params: {domain: office} }
					)
					.then(
						function(data){ // success handler
							if (successCallback){
								successCallback(data);
							} else {
								// if no success callback is defined
								// display success in console
								dentyDebugger.console(data, loadServicesPage, "info");
							}
						},
						function(data){ // error handler
							if (errorCallback){
								errorCallback(data);
							} else {
								// if no error callback is defined
								// display errors in console
								dentyDebugger.console(data, loadServicesPage, "error");
							}
						}
					);
			}

			/*
			@description: load "gallery" page data
			@office: domain of office being displayed
			*/
			function loadGalleryPage(office, successCallback, errorCallback){
				// prevent malicious queries if current office does not have a gallery page configured
				if (!$rootScope.configs.has_gallery){
					dentyDebugger.console(office, loadGalleryPage, "error");
				}

				return $http
					.get("/api/v1/gallery_page.php",
						{ params: {domain: office} }
					)
					.then(
						function(data){ // success handler
							if (successCallback){
								successCallback(data);
							} else {
								// if no success callback is defined
								// display success in console
								dentyDebugger.console(data, loadGalleryPage, "info");
							}
						},
						function(data){ // error handler
							if (errorCallback){
								errorCallback(data);
							} else {
								// if no error callback is defined
								// display errors in console
								dentyDebugger.console(data, loadGalleryPage, "error");
							}
						}
					);
			}

			/*
			@description: load "offers" page data
			@office: domain of office being displayed
			*/
			function loadOffersPage(office, successCallback, errorCallback){
				// prevent malicious queries if current office does not have a offers page configured
				if (!$rootScope.configs.has_offers){
					dentyDebugger.console(office, loadOffersPage, "error");
				}

				return $http
					.get("/api/v1/offers_page.php",
						{ params: {domain: office} }
					)
					.then(
						function(data){ // success handler
							if (successCallback){
								successCallback(data);
							} else {
								// if no success callback is defined
								// display success in console
								dentyDebugger.console(data, loadOffersPage, "info");
							}
						},
						function(data){ // error handler
							if (errorCallback){
								errorCallback(data);
							} else {
								// if no error callback is defined
								// display errors in console
								dentyDebugger.console(data, loadOffersPage, "error");
							}
						}
					);
			}

			/*
			@description: load "contact" page data
			@office: domain of office being displayed
			*/
			function loadContactPage(office, successCallback, errorCallback){
				// prevent malicious queries if current office does not have a contact page configured
				if (!$rootScope.configs.has_contact){
					dentyDebugger.console(office, loadContactPage, "error");
				}

				return $http
					.get("/api/v1/contact_page.php",
						{ params: {domain: office} }
					)
					.then(
						function(data){ // success handler
							if (successCallback){
								successCallback(data);
							} else {
								// if no success callback is defined
								// display success in console
								dentyDebugger.console(data, loadContactPage, "info");
							}
						},
						function(data){ // error handler
							if (errorCallback){
								errorCallback(data);
							} else {
								// if no error callback is defined
								// display errors in console
								dentyDebugger.console(data, loadContactPage, "error");
							}
						}
					);
			}

			/*
			@description: load "financing" page data
			@office: domain of office being displayed
			*/
			function loadFinancingPage(office, successCallback, errorCallback){
				// prevent malicious queries if current office does not have a financing page configured
				if (!$rootScope.configs.has_financing){
					dentyDebugger.console(office, loadFinancingPage, "error");
				}

				return $http
					.get("/api/v1/financing_page.php",
						{ params: {domain: office} }
					)
					.then(
						function(data){ // success handler
							if (successCallback){
								successCallback(data);
							} else {
								// if no success callback is defined
								// display success in console
								dentyDebugger.console(data, loadFinancingPage, "info");
							}
						},
						function(data){ // error handler
							if (errorCallback){
								errorCallback(data);
							} else {
								// if no error callback is defined
								// display errors in console
								dentyDebugger.console(data, loadFinancingPage, "error");
							}
						}
					);
			}
		}
	]);