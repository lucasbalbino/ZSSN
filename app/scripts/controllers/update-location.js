'use strict';

/**
 * @ngdoc function
 * @name zssnApp.controller:AddSurvivorCtrl
 * @description
 * # AddSurvivorCtrl
 * Controller of the zssnApp
 */
angular.module('zssnApp')
    .controller('UpdateLocationCtrl', function ($scope, $http, $route, $geolocation, uiGmapGoogleMapApi, domain) {
        $scope.processed = false;

        $scope.selectedSurvivor = null;
        $scope.newLocation = null;

        $scope.currentMap = {
            center: {
                latitude: -16.335933699464533,
                longitude: -48.94442439079285
            },
            zoom: 13,
            options: {
                draggable: false
            },
            marker: {
                id: 0
            }
        };

        $scope.newMap = {
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

                    $scope.newMap.marker.latitude = lat;
                    $scope.newMap.marker.longitude = lon;
                    $scope.newLocation = {lonlat: 'POINT (' + lat + ' ' + lon + ')'};

                    //scope apply required because this event handler is outside of the angular domain
                    $scope.$evalAsync();
                }
            }
        };

        $scope.people = [];

        function retrievePeople() {
            $http.get(domain + '/api/people.json').then(
                function (response) {
                    var retrievedPeople = response.data;

                    for (var i = 0; i < retrievedPeople.length; i++) {
                        if (!retrievedPeople[i]['infected?']) {
                            $scope.people.push(retrievedPeople[i]);
                        }
                    }


                    for (i = 0; i < $scope.people.length; i++) {
                        var parts = $scope.people[i].location.split('/');
                        $scope.people[i].id = parts[parts.length - 1];
                    }
                }
            );
        }

        retrievePeople();

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

                        $scope.newMap.center.latitude = lat;
                        $scope.newMap.center.longitude = lon;

                        $scope.newMap.marker.latitude = lat;
                        $scope.newMap.marker.longitude = lon;
                        $scope.newLocation = {lonlat: 'POINT (' + lat + ' ' + lon + ')'};
                    },
                    function (positionError) {
                        $scope.geolocationError = positionError.error.message;
                    }
                );
            }

            currentLocation();
        });

        $scope.updateCurrentMap = function (survivor) {
            var regex = /\(([^()]+)\)/g;
            var coords = (regex.exec(survivor.lonlat)[1]).split(' ');

            var lon = coords[1];
            var lat = coords[0];

            $scope.currentMap.center.latitude = lat;
            $scope.currentMap.center.longitude = lon;

            $scope.currentMap.marker = {
                id: 0,
                latitude: lat,
                longitude: lon
            };
        };

        $scope.submitted = false;

        $scope.processUpdate = function () {
            $scope.submitted = true;

            if ($scope.selectedSurvivor) {
                if ($scope.newLocation && $scope.newLocation.lonlat) {
                    if (!$scope.isSameLocation($scope.currentMap.marker, $scope.newMap.marker)) {

                        $http.patch(domain + '/api/people/'+ $scope.selectedSurvivor.id +'.json', {
                            name: $scope.selectedSurvivor.name,
                            age: $scope.selectedSurvivor.age,
                            gender: $scope.selectedSurvivor.gender,
                            lonlat: $scope.newLocation.lonlat
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
                }
            }
        };

        $scope.reloadRoute = function () {
            $route.reload();
        };

        $scope.isSameLocation = function (m1, m2) {
            if(m1 && m2) {
                return (m1.latitude === m2.latitude) && (m1.longitude === m2.longitude);
            } else {
                return false;
            }
        };
    })
;
