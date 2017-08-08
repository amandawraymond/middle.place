(function() {

  angular
    .module('myApp', [
      'ngAnimate',
      'ngSanitize',
      'ui.router',
      'ct.ui.router.extras',
      'uiGmapgoogle-maps',
      'templates'
    ])
    .config([
      '$stateProvider', '$urlRouterProvider', '$locationProvider',
      'uiGmapGoogleMapApiProvider', routes
    ]);

  function routes(
    $stateProvider, $urlRouterProvider, $locationProvider, 
    uiGmapGoogleMapApiProvider
  ) {

    uiGmapGoogleMapApiProvider.configure({
      // key: 'AIzaSyByBTIEm1R1CZbd25uEfosgs3iwZWjQatM',
      v: '3.17',
      libraries: 'geometry,visualization'
    });

    $stateProvider
      .state('address', {
        url: '/',
        templateUrl: 'address.html',
        controller: 'AddressController as addressCtrl'
      })
      .state('donations', {
        url: '/donations',
        templateUrl: 'donations.html'
      })
      .state('team', {
        url: '/team',
        templateUrl: 'team.html',
        controller: 'TeamController as teamCtrl'
      })
      .state('tips', {
        url: '/tips',
        templateUrl: 'tips.html'
      });

    // default fall back route
    $urlRouterProvider.otherwise('/');

    // enable HTML5 Mode for SEO
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
})();
