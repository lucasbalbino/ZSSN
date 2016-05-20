'use strict';

/**
 * @ngdoc function
 * @name zssnApp.controller:AddSurvivorCtrl
 * @description
 * # AddSurvivorCtrl
 * Controller of the zssnApp
 */
angular.module('zssnApp')
    .controller('AddSurvivorCtrl', function ($scope, $http, $route, $geolocation, uiGmapGoogleMapApi, domain) {
        $scope.processed = false;

        $scope.survivor = {};

        $scope.map = {
            center: {
                latitude: -16.335933699464533,
                longitude: -48.94442439079285
            },
            zoom: 13,
            marker: {
                id: 0
            },
            events: {
                tilesloaded: function () {
                },

                click: function (mapModel, eventName, originalEventArgs) {

                    var e = originalEventArgs[0];
                    var lat = e.latLng.lat(),
                        lon = e.latLng.lng();

                    $scope.map.marker.latitude = lat;
                    $scope.map.marker.longitude = lon;
                    $scope.survivor.lonlat = 'POINT (' + lat + ' ' + lon + ')';

                    //scope apply required because this event handler is outside of the angular domain
                    $scope.$evalAsync();
                }
            }
        };

        uiGmapGoogleMapApi.then(function () {

            function currentLocation() {
                $geolocation.getCurrentPosition({
                    timeout: 60000,
                    maximumAge: 250,
                    enableHighAccuracy: true
                }).then(
                    function (position) {
                        var lat = position.coords.latitude;
                        var lon = position.coords.longitude;

                        $scope.map.center.latitude = lat;
                        $scope.map.center.longitude = lon;

                        $scope.map.marker.latitude = lat;
                        $scope.map.marker.longitude = lon;
                            $scope.survivor.lonlat = 'POINT (' + lat + ' ' + lon + ')';
                    },
                    function (positionError) {
                        $scope.geolocationError = positionError.error.message;
                    }
                );
            }

            currentLocation();
        });

        $scope.submitted = false;

        $scope.processAddition = function () {
            $scope.submitted = true;

            if ($scope.survivor && $scope.survivor.lonlat) {

                $http.post(domain + '/api/people.json', {
                    name: $scope.survivor.name,
                    age: $scope.survivor.age,
                    gender: $scope.survivor.gender,
                    lonlat: $scope.survivor.lonlat,
                    items: transformItems($scope.survivor.item)
                }).then(
                    function (response) {
                        console.log(response.data);
                        $scope.processed = true;
                    },
                    function (responseError) {
                        console.error(responseError.data);
                        $scope.internalError = responseError.data.name[0];
                    }
                );

            }
        };

        function transformItems(items) {
            return 'Water:' + items.water +
                ';Food:' + items.food +
                ';Medication:' + items.medication +
                ';Ammunition:' + items.ammunition + ';';
        }

        $scope.reloadRoute = function () {
            $route.reload();
        };
    })
;
