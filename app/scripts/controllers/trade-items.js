'use strict';

/**
 * @ngdoc function
 * @name zssnApp.controller:TradeItemsCtrl
 * @description
 * # TradeItemsCtrl
 * Controller of the zssnApp
 */
angular.module('zssnApp')
    .controller('TradeItemsCtrl', function ($scope, $http, $route, domain) {
        $scope.processed = false;

        $scope.selectedFromSurvivor = {
            item: {
                water: 0,
                food: 0,
                medication: 0,
                ammunition: 0
            }
        };
        $scope.selectedToSurvivor = {
            item: {
                water: 0,
                food: 0,
                medication: 0,
                ammunition: 0
            }
        };

        $scope.itemsFrom = {
            water: 0,
            food: 0,
            medication: 0,
            ammunition: 0
        };
        $scope.itemsTo = {
            water: 0,
            food: 0,
            medication: 0,
            ammunition: 0
        };

        $scope.points = {
            water: 0,
            food: 0,
            medication: 0,
            ammunition: 0
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

        $scope.fetchProperties = function (survivor) {
            $http.get(domain + '/api/people/' + survivor.id + '/properties.json').then(
                function (response) {
                    var properties = response.data;

                    survivor.item = {
                        water: 0,
                        food: 0,
                        medication: 0,
                        ammunition: 0
                    };

                    for (var i = 0; i < properties.length; i++) {
                        if (properties[i].item.name === 'Water') {
                            survivor.item.water = properties[i].quantity;
                            $scope.points.water = properties[i].item.points;
                        }
                        else if (properties[i].item.name === 'Food') {
                            survivor.item.food = properties[i].quantity;
                            $scope.points.food = properties[i].item.points;
                        }
                        else if (properties[i].item.name === 'Medication') {
                            survivor.item.medication = properties[i].quantity;
                            $scope.points.medication = properties[i].item.points;
                        }
                        else if (properties[i].item.name === 'Ammunition') {
                            survivor.item.ammunition = properties[i].quantity;
                            $scope.points.ammunition = properties[i].item.points;
                        }
                    }
                }
            );
        };

        $scope.computePoints = function (items) {
            return ($scope.points.water * items.water) +
                ($scope.points.food * items.food) +
                ($scope.points.medication * items.medication) +
                ($scope.points.ammunition * items.ammunition);
        };


        $scope.submitted = false;

        $scope.processTrade = function () {
            $scope.submitted = true;

            if ($scope.selectedFromSurvivor.name && $scope.selectedToSurvivor.name) {
                if ($scope.computePoints($scope.itemsFrom) > 0 && $scope.computePoints($scope.itemsTo) > 0) {
                    if ($scope.selectedFromSurvivor.id !== $scope.selectedToSurvivor.id) {
                        if ($scope.computePoints($scope.itemsFrom) === $scope.computePoints($scope.itemsTo)) {

                            $http.post(domain + '/api/people/' + $scope.selectedFromSurvivor.id + '/properties/trade_item.json', {
                                person_id: $scope.selectedFromSurvivor.id,
                                consumer: {
                                    name: $scope.selectedToSurvivor.name,
                                    pick: transformItems($scope.itemsFrom),
                                    payment: transformItems($scope.itemsTo)
                                }
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
    });
