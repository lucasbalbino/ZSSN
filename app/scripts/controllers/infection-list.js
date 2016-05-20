'use strict';

/**
 * @ngdoc function
 * @name zssnApp.controller:InfectionListCtrl
 * @description
 * # InfectionListCtrl
 * Controller of the zssnApp
 */
angular.module('zssnApp')
    .controller('InfectionListCtrl', function ($scope, $http, $timeout, $window, domain) {
        $scope.submitted = false;
        $scope.processed = false;

        $scope.answer = '';

        $scope.infectedPeople = [];

        function retrieveInfectedPeople() {
            $scope.infectedPeople = [];

            $http.get(domain + '/api/people.json').then(
                function (response) {
                    var retrievedPeople = response.data;

                    for (var i = 0; i < retrievedPeople.length; i++) {
                        if (retrievedPeople[i]['infected?']) {
                            $scope.infectedPeople.push(retrievedPeople[i]);
                        }
                    }


                    for (i = 0; i < $scope.infectedPeople.length; i++) {
                        var parts = $scope.infectedPeople[i].location.split('/');
                        $scope.infectedPeople[i].id = parts[parts.length - 1];
                    }
                }
            );
        }

        retrieveInfectedPeople();

        $scope.processQuestion = function () {
            $scope.processed = true;
            if ($scope.answer !== '42') {
                $scope.seconds = 10;

                $scope.onTimeout = function () {
                    if ($scope.seconds === 1) {
                        $timeout(function () {
                            $timeout.cancel(timer);
                        }, 1000);
                    }

                    $scope.seconds--;
                    timer = $timeout($scope.onTimeout, 1000);
                };

                var timer = $timeout($scope.onTimeout, 1000);
            }
        };

    });
