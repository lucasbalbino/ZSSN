'use strict';

/**
 * @ngdoc overview
 * @name zssnApp
 * @description
 * # zssnApp
 *
 * Main module of the application.
 */
angular
    .module('zssnApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'uiGmapgoogle-maps',
        'ngGeolocation'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/add-survivor', {
                templateUrl: 'views/add-survivor.html',
                controller: 'AddSurvivorCtrl',
                controllerAs: 'addSurvivor'
            })
            .when('/trade-items', {
                templateUrl: 'views/trade-items.html',
                controller: 'TradeItemsCtrl',
                controllerAs: 'tradeItems'
            })
            .when('/update-location', {
                templateUrl: 'views/update-location.html',
                controller: 'UpdateLocationCtrl',
                controllerAs: 'updateLocation'
            })
            .when('/infection-list', {
              templateUrl: 'views/infection-list.html',
              controller: 'InfectionListCtrl',
              controllerAs: 'infectionList'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.22', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    })
    .controller('zssnAppCtrl', function ($scope, $http, $q, $location, $timeout, $window, domain) {
        $scope.url = domain;
    })
    .constant('domain', 'http://zssn-backend-example.herokuapp.com');
