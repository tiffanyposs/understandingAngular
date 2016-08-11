var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'main.html',
        controller: 'mainController'
    })

    
});

myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
    $scope.person = {
        name: 'John',
        address: '555 Main Street',
        city: 'Sunnyville',
        state: 'CA',
        zipcode: '90210'
    }
    
    $scope.formattedAddress = function(person) {
        return person.address + ', ' + person.city + ', ' + person.state + ' ' + person.zipcode;
    }
}]);




myApp.directive('searchResults', function() {
    return {
         restrict: 'AECM',
        // template: '<a href="#" class="list-group-item"><h4 class="list-group-item-heading">Doe, John</h4><p class="list-group-item-text">555 Main Street</p></a>',
        templateUrl: 'directives/searchresults.html',
        replace: true,
        scope: {
//            personName: "@",
//            personAddress: "@",
            personObject: "=",
            formattedAddressFunction: "&"
        }
    }
});