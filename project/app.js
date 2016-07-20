//var myApp = angular.module('myApp', ['ngMessages', 'ngResource']);
//
//myApp.controller('mainController', function($scope, $log, $filter, $resource) {
//    
//    $scope.name = "John";
//    $scope.formattedname = $filter('uppercase')($scope.name);
//    
//    $log.log($scope);
//    $log.log($scope.name);
//    $log.log($scope.formattedname);
//    
//    $log.log($resource);
//    
//});
//


var myApp = angular.module('myApp', ['ngMessages']);

myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
    $log.log($scope);
}]);

//var myApp=angular.module("myApp",["ngMessages"]);myApp.controller("mainController",["$scope","$log",function(o,l){l.log(o)}]);

