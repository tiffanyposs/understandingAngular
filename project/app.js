var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$filter', '$timeout', '$http', function ($scope, $filter, $timeout, $http) {
    
    $scope.handle = '';
    $scope.lowercaseHandle = function () {
        return $filter('lowercase')($scope.handle);
    };
    $scope.characters = 5;
    
    
    
    $scope.rules = [
        
        {rulename: "Must be 5 characters."},
        {rulename: "Must not be used elsewhere."},
        {rulename: "Must be cool"}
        
    ];
    
    $scope.newRule = '';
    $scope.addRule = function () {
        $http.post('/api/endpoint', {
            newRule: $scope.newRule
        }).success(function (result) {
            $scope.rules = result;
            $scope.newRule = '';
        }).error(function (data, status) {
           console.log(data, status); 
        });
    };
    
    
    
    $scope.alertClick = function () {
        alert('Clicked!');
    };
    $scope.name = 'John Doe';

    $scope.$watch('handle', function (newValue, oldValue) {
        console.info('Changed!');
        console.log('New Value: ' + newValue);
        console.log('Old Value: ' + oldValue);
    });
    
    // $http.get('https://randomuser.me/api/')
    //     .success(function (result) {
    //         $scope.user = result.results[0];
    //         console.log(result);
    //      })
    //      .error(function (data, status) {
    //          console.log(data, error)
    //      });
    
    
    
//    var rulesrequest = new XMLHTTPRequest();
//    rulesrequest.onreadystatechange = function () {
//        $scope.$apply(function() {
//            if(rulesrequest.readyState == 4 && rulesrequest.status == 200) {
//                $scope.rules = JSON.parse(rulesrequest.responseText);
//            }
//        });
//    };
//    
//    rulesrequest.open('GET', 'http://localhost:54765/api', true);
//    rulesrequest.send();
    
    
    
    
    
//    setTimeout(function () {
//        $scope.$apply(function () {
//            $scope.handle = 'changedTwitterHandle';
//            console.log('It Changed');
//        });
//    }, 3000);
    
//    $timeout(function() {
//        $scope.handle = 'changedTwitterHangle';
//        console.log('It Changed');
//    }, 3000);
    
}]);
