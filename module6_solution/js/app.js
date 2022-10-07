(function() {
    'use strict';

    angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController)

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunchItems = '';
        $scope.message = '';
        $scope.fontColor = '';
        $scope.checkIfTooMuch = function() {
            var filteredLunchItems = [];
            if ($scope.lunchItems.length !== 0) {
                filteredLunchItems = $scope.cleanEntries($scope.lunchItems);
            }

            if (filteredLunchItems.length !== 0) {
                if (filteredLunchItems.length <= 3) {
                    $scope.message = 'Enjoy!';
                } else {
                    $scope.message = 'Too much!'
                }
                $scope.fontColor = 'green';
            } else {
                $scope.message = "Please enter data first"
                $scope.fontColor = 'red';
            }
        }

        $scope.cleanEntries = function(entries) {
            // trims the white space between delimiter
            var cleaned = entries.split(',').map(function(item) {
                return item.trim();
            });
            // empty string would return false;
            cleaned = cleaned.filter(entry => entry);
            return cleaned;
        }
    };
})();