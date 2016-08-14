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

myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
    
    $scope.people = [
        {
        name: 'John Doe',
        address: '555 Main St.',
        city: 'New York',
        state: 'NY',
        zip: '11111'
        },
        {
        name: 'Jane Doe',
        address: '555 Brookyn Ave.',
        city: 'Brooklyn',
        state: 'NY',
        zip: '10025'
        },
        {
        name: 'Joe Shmo',
        address: '555 Astoria Blvd.',
        city: 'Astoria',
        state: 'NY',
        zip: '11105'
        }           
    ];
    
    $scope.formattedAddress = function(person) {
      
        return person.address + ', ' + person.city + ', ' + person.state + ' ' + person.zip;
        
    };
    
}]);

myApp.controller('secondController', ['$scope', '$log', '$routeParams', function($scope, $log, $routeParams) {
    
    
    
}]);

myApp.directive("searchResult", function() {
   return {
       restrict: 'AECM',
       templateUrl: 'directives/searchresult.html',
       replace: true,
       scope: {
           personObject: "=",
           formattedAddressFunction: "&"
       },
       compile: function(elem, attrs) {
           
           console.log('Compiling...');
           console.log(elem.html());
           
           return {
//               pre: function(scope, element, attrs) {
//                   console.log('Prelinking...');
//                   console.log(element);
//               },
               post: function(scope, elements, attrs) {
                   console.log(scope);
                   if(scope.personObject.name === "Jane Doe") {
                       elements.removeAttr('class');
                   }
                   console.log('Postlinking...');
                   console.log(elements);
               }
           }
           
       }
   }
});
