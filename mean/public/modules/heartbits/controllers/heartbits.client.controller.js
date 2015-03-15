'use strict';

// Heartbits controller
angular.module('heartbits').controller('HeartbitsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Heartbits',
    function($scope, $stateParams, $location, Authentication, Heartbits) {
        $scope.authentication = Authentication;

        // Create new Heartbit
        $scope.create = function() {
            // Create new Heartbit object
            var heartbit = new Heartbits({
                name: this.name,
                type: this.type
            });

            // Redirect after save
            heartbit.$save(function(response) {
                $location.path('heartbits/' + response._id);

                // Clear form fields
                $scope.name = '';
                $scope.type = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Heartbit
        $scope.remove = function(heartbit) {
            if (heartbit) {
                heartbit.$remove();

                for (var i in $scope.heartbits) {
                    if ($scope.heartbits[i] === heartbit) {
                        $scope.heartbits.splice(i, 1);
                    }
                }
            } else {
                $scope.heartbit.$remove(function() {
                    $location.path('heartbits');
                });
            }
        };

        // Update existing Heartbit
        $scope.update = function() {
            var heartbit = $scope.heartbit;

            heartbit.$update(function() {
                $location.path('heartbits/' + heartbit._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Heartbits
        $scope.find = function() {
            $scope.heartbits = Heartbits.query();
        };

        // Find existing Heartbit
        $scope.findOne = function() {
            $scope.heartbit = Heartbits.get({
                heartbitId: $stateParams.heartbitId
            });
        };
    }
]);