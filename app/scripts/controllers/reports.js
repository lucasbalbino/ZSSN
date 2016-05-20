'use strict';

/**
 * @ngdoc function
 * @name zssnApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the zssnApp
 */
angular.module('zssnApp')
    .controller('ReportsCtrl', function ($scope, $http, domain) {
        $scope.reports = [];

        retrieveReports();

        function retrieveReports() {
            $http.get(domain + '/api/report.json').then(
                function (response) {
                    processReports(response.data);
                }
            )
        }

        function processReports(data) {
            for (var i = 0; i < data.length; i++) {
                $http.get(data[i]).then(
                    function (response) {
                        var report = response.data.report;
                        var value = "";

                        var keys = Object.keys(report);
                        for (var j = 0; j < keys.length; j++) {
                            if (keys[j] != 'description') {
                                if(report[keys[j]].toString().indexOf('.') == -1)
                                    value += report[keys[j]] + " ";
                                else
                                    value += report[keys[j]].toFixed(2) + " ";

                            }
                        }

                        $scope.reports.push(
                            {
                                "description": report.description,
                                "value": value
                            }
                        );
                    }
                )
            }
        }

    });
