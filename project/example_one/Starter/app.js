var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
   $routeProvider
       .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
       })
       .when('/second', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
       })
       .when('/third', {
            templateUrl: 'pages/third.html',
            controller: 'thirdController'
       })
       .when('/example', {
             templateUrl: 'pages/example.html',
             controller: 'exampleController'
       })
       .when('/example/:num', {
             templateUrl: 'pages/example.html',
             controller: 'exampleController'
       })
});

myApp.controller('mainController', ['$scope', '$location', '$log', function($scope, $location, $log) {
    
    $log.info('First Controller : ' + $location.path());
    $scope.name = 'Main';
 
}]);


myApp.controller('secondController', ['$scope', '$location', '$log', function($scope, $location, $log) {
    
    $log.info('Second Controller : ' + $location.path());
    $scope.name = 'Second';
 
}]);


myApp.controller('thirdController', ['$scope', '$location', '$log', function($scope, $location, $log) {
    
    $log.info('Third Controller : ' + $location.path());
    $scope.name = 'Third';
 
}]);



myApp.controller('exampleController', ['$scope', '$location', '$log', '$routeParams', function($scope, $location, $log, $routeParams) {
    
    $log.info('Example Controller : ' + $location.path());
    $log.info($routeParams);
    
    $scope.name = 'Example';
    $scope.num = $routeParams.num || 0;
 
}]);




