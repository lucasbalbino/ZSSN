'use strict';

/**
 * @ngdoc function
 * @name zssnApp.controller:IsInfectedCtrl
 * @description
 * # IsInfectedCtrl
 * Controller of the zssnApp
 */
angular.module('zssnApp')
    .controller('IsInfectedCtrl', function ($scope, $http, domain) {
        $scope.reportInfection = false;
        $scope.submitted = false;
        $scope.processed = false;

        $scope.selectedFromSurvivor = null;
        $scope.selectedToSurvivor = null;

        $scope.people = [];

        function retrievePeople() {
            $scope.people = [];

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

        $scope.processInfection = function() {
            $scope.reportInfection = true;
            $scope.processed = false;
            $scope.submitted = false;

            $scope.selectedFromSurvivor = null;
            $scope.selectedToSurvivor = null;
        };

        $scope.flagInfection = function () {
            $scope.submitted = true;

            if ($scope.selectedFromSurvivor && $scope.selectedToSurvivor) {
                if ($scope.selectedFromSurvivor.id !== $scope.selectedToSurvivor.id) {

                    $http.post(domain + '/api/people/'+ $scope.selectedFromSurvivor.id +'/report_infection.json', {
                        infected: $scope.selectedToSurvivor.id,
                        id: $scope.selectedFromSurvivor.id
                    }).then(
                        function (response) {
                            console.log(response.data);
                            $scope.reportInfection = false;
                            $scope.processed = true;

                            retrievePeople();
                        },
                        function (responseError) {
                            console.error(responseError.data);
                            $scope.internalError = responseError.data.name[0];
                        }
                    );

                }
            }
        };
    });
