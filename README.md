##Understanding Angular

[Class Here](https://www.udemy.com/learn-angularjs/learn/v4/overview)


###Big Words Defined

* **Dependency Injection** - Giving a function an object. Rather than creating an object inside of a function, you pass it to a function.

####Problems Angular is trying

Trying to make your application automatically update without having to write a ton of JS or jQuery to manipulate the DOM.

####Model, View, Whatever (MV*)


* Model - the part the defines the data (database of variable)
* View - the part that people see
* Whatever - The part that binds the Model and View together (Controllers or View Models)


####Custom Attributes

In html you can have custom attributes. It's customary to use `data-` a the beginning of custom attributes, but it is not manditory

```
  <!--Works, but not customary-->
  <h1 reply="Hello Back!">Hello World</h1>
  
  <!--Customary to put data- in front of a custom attr-->
  <h1 data-reply="Hello Back!">Hello World</h1>
  
```

In Angular, by convention the attributes start with `ng-` OR  if you want to keep with the attribute convention `data-ng-`

####The Global Namespace

Lets say you have two files a `utility.js` and then a `app.js`.

**utility.js:**

```
var person = "Steve";

function logPerson() {
  console.log(person);
}

```
**app.js:**

```
var person = "Jeff";

logPerson()

```

When you log person in the second `app.js` file, it will be the variable you put in the `app.js` not `utility.js` (Jeff not Steve)


This is why namespacing is important. A better way the `utility.js` file could be written to prevent interference, is by putting all of the variables and functions into an object.

```
var utility = {};

utility.person = "Steve";

function logPerson() {
  console.log(utility.person);
}

```


###Basic Structure

We first need to load in Angular.js

```
  <script src="//code.angularjs.org/1.3.0-rc.1/angular.min.js"></script>

```

In our `app.js` file, we can create a *namespace* for our app. This will contain all of the variable we need.

So below you see we create a variable and pass some arguments to `angular.module` method. The first argument is the name of your module, often  you name the variable and this argument the same. The second argument is an array of dependencies. For now it will remain empty.

```
  // MODULE
  var angularApp = angular.module('angularApp', []);

```

Now we need to tell the html file which part of the file is going to be controlled by this module. We can do this simply by adding it to the *html* tag within our project `ng-app="angularApp"`. (You can attach this to any tag in html, if you have specific areas needing control)

```
  <html lang="en-us" ng-app="angularApp">
  
    ...
    
  </html>

```

Next we are going to declare a controller. Now we use he variable we named before, and call the `controller` method on it. The first argument is the name of this controller.

```
// CONTROLLERS
angularApp.controller('mainController', ['$scope', function ($scope) {
    
}]);


```

In the html, somewhere within the view you created (ng-app="angularApp") you can add the controller you just made. So when this runs it will find the `ng-app` attribute and be like "Hey, they have a view named *angularApp*" and then they will see `ng-controller` and it will be like "Hey they must have a controller named *mainController* within the *angularApp* view"


```
  <html ng-app="angularApp">
    <head>
      <!-- include angular and app.js here-->
    </head>
    <body>
      <div ng-controller="mainController">
        <h1>Hello World</h1>
      </div>
    </body>
  </html>

```


###Dependency Injection

**Dependency Injection** is when you give a function an object. Rather than creating an object inside of a function, you pass it to a function.

This is an example of what NOT to do . The `john` variable is created inside of the logPerson function. It's better to pass a function it's dependencies


```
var Person = function (firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
};

function logPerson(){
  var john = new Person('john', 'doe');
  console.log(john);
}

logPerson();


```

Below is an example of how you SHOULD build a function, that you create the person outside of the log function (or get it from a database), and then you pass it to the function.

```
var Person = function (firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
};

function logPerson(person) {
  console.log(person);
}

var john = new Person('john', 'doe');
logPerson(john);

```


###$scope

Below is a simple example of Angular doing some *dependency injection*. It comes with the `$scope` object that you are injecting into the controller. Then you can add variables and methods to the scope method.

```
var myApp = angular.module('myApp', []);

myApp.controller('mainController', function($scope) {
  
    $scope.name = 'Jane Doe';
    $scope.occupation = 'Coder';
    $scope.getname = function(){
      return 'John Doe'
    }
    console.log($scope);
  
});

```


###functions and strings

The basic concept is that angular parses through a function that is converted to a string in order to get it's dependencies. see the below example demos that just logging a function (without invoking it) it is converted to a string.

```
var searchPeople = function(firstname, lastname, height, age, occupation) {
  return 'Jane Doe'
}

//converts the function to a string automatically
console.log(searchPeople);

//converts it automatically
var searchPeopleString = searchPeople.toString();
console.log(searchPeopleString);

```

So if we log what we do below, you will see it will return an array of the param names. So when we inject dependencies, angular looks for param names it knows (placed anywhere) and will inject them accordingly.


```
var searchPeople = function(firstname, $scope, lastname, height, age, occupation) {
  return 'Jane Doe'
}

console.log(angular.injector().annotate(searchPeople));

```

If you go to the source code [here](https://code.angularjs.org/1.5.0-rc.2/angular.js) towards the top you can see all of the variables defined. Also, you can see the docs [here](https://docs.angularjs.org/api/ng/service) at services

So we can inject any of these *services* into our controller and it will know what they are. Below you can see us using the `$log` service to demo different types of Angular logs

```
var myApp = angular.module('myApp', []);

myApp.controller('mainController', function($scope, $http, $log) {
    console.log($scope);
    console.log($http);
    console.log($log);
    
    $log.log('Hello.');
    $log.info('This is some information.');
    $log.warn('This is a warning');
    $log.debug('Some debug information while writing my code');
    $log.error('This was an error');
});

```

####Adding services

There are also additional things you can add to your project as dependencies that don't come with the base library. For example if you go [here](https://code.angularjs.org/1.5.0-rc.2/) you will see other js files outside of the core library that will have other *services* you can use if you include them. 

For example, I want to use this [messages service](https://code.angularjs.org/1.5.0-rc.2/angular-messages.js). So I include a link to the minified version in my project directly after were I load in angular:

```
  <script src="//code.angularjs.org/1.5.0-rc.2/angular-messages.min.js"></script>
  
```

If you look at the non-minified version you will see a comment like this:

>`The 'ngMessages' module provides enhanced support for displaying messages within templates`

Which tells you the name of this dependency is `ngMessages`. Now we need to include it in our `app.js` file to tell Angular that we want to use it as a dependency. We can do this by passing the messages module into our angular `myApp` module into the second param as part of an array.

```
  var myApp = angular.module('myApp', ['ngMessages']);

```





