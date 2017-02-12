angular.module("dentyApp", [
		// list angular components
		"ui.router",
		"ngAnimate"
	])
	// route configurations
	.config([
		"$stateProvider",
  	"$urlRouterProvider",
    "$locationProvider",
		function($stateProvider, $urlRouterProvider, $locationProvider){
			"use strict";

			// define states
			$stateProvider
				.state("denty", { // root
					abstract: true,
					template: '<loader-body-page ng-show="$root.loaderAllBodyDisplay"></loader-body-page><ui-view/>',
					resolve: {
						// ensure all office data has been loaded before accessing routes
						office: function(officeConfigs){
							return officeConfigs.init();
						}
					}
				})
				// states under office load
  	  	.state("denty.home", { // home
	  	  	url: "/",
	  	  	templateUrl: "templates/_home.html",
	  	  	controller: "dentyHome"
	  	  })
	  	  .state("denty.about", { // about
	  	  	url: "/about",
	  	  	templateUrl: "templates/_about.html",
	  	  	controller: "dentyAbout"
	  	  })
	  	  .state("denty.services", { // services
	  	  	url: "/services",
	  	  	templateUrl: "templates/_services.html",
	  	  	controller: "dentyServices"
	  	  })
	  	  .state("denty.testimonials", { // testimonials
	  	  	url: "/testimonials",
	  	  	templateUrl: "templates/_testimonials.html",
	  	  	controller: "dentyTestimonials"
	  	  })
	  	  .state("denty.gallery", { // gallery
	  	  	url: "/gallery",
	  	  	templateUrl: "templates/_gallery.html",
	  	  	controller: "dentyGallery"
	  	  })
	  	  .state("denty.offers", { // offers
	  	  	url: "/offers",
	  	  	templateUrl: "templates/_offers.html",
	  	  	controller: "dentyOffers"
	  	  })
	  	  .state("denty.rewards", { // rewards
	  	  	url: "/rewards",
	  	  	templateUrl: "templates/_rewards.html",
	  	  	controller: "dentyRewards"
	  	  });

			// redirect home for wrong urls
  	  $urlRouterProvider.otherwise("/");

			// use non-hashbang urls
      if(window.history && window.history.pushState){
        // $locationProvider.html5Mode(true);
      }
		}
	]).run([
		"$rootScope", "$state", 
		function($rootScope, $state){
			"use strict";

			// catch state change and ensure office is configured to visit
			$rootScope.$on("$stateChangeStart", function(ev, toState, toParams, fromState, fromParams){
				// flag if state is available
				var cannotVisit = false;

				// check state directed to
				switch(toState.name){
					case "denty.about":
						cannotVisit = !$rootScope.configs.has_about;
						break;
					case "denty.services":
						cannotVisit = !$rootScope.configs.has_services;
						break;
					case "denty.testimonials":
						cannotVisit = !$rootScope.configs.has_testimonials;
						break;
					case "denty.gallery":
						cannotVisit = !$rootScope.configs.has_gallery;
						break;
					case "denty.offers":
						cannotVisit = !$rootScope.configs.has_offers;
						break;
					case "denty.rewards":
						cannotVisit = !$rootScope.configs.has_rewards;
						break;
					default:
						// allow redirect
						break;
				}

				// if the route is not available for the current configuration
				if (cannotVisit){
					// prevent redirect and instead send home
					ev.preventDefault();
					$state.go("denty.home");
				}
			});
		}
	]);