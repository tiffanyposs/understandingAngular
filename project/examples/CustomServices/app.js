var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    
    .when('/second', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })
    
    .when('/second/:num', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })
    
});

myApp.service('serviceName', function() {
    var self = this;
    this.name = "John Doe";
    this.nameLength = function(){
        return self.name.length
    }
});

myApp.controller('mainController', ['$scope', '$log', 'serviceName', function($scope, $log, serviceName) {
    $scope.name = serviceName.name;
    $scope.$watch('name', function(){
       serviceName.name = $scope.name; 
    });
    
}]);

myApp.controller('secondController', ['$scope', '$log', '$routeParams', 'serviceName', function($scope, $log, $routeParams, serviceName) {
    $scope.name = serviceName.name;
    $scope.$watch('name', function(){
       serviceName.name = $scope.name; 
    });
    
}]);
