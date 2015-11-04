/**
* demo Module
*
* Demo for tusimple-file-upload
*/
angular.module('demo', ['tusimpleFileUpload'])
    .controller('demo', ['$scope','$http','$log', function($scope,$http,$log){
        $scope.test = function () {
            $http.get('/api/test').then(function (data) {
                $log.log(data);             
            });
        };
    }]);