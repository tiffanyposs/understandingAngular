##Understanding Angular

[Class Here](https://www.udemy.com/learn-angularjs/learn/v4/overview)


###Big Words Defined

* **Dependency Injection** - Giving a function an object. Rather than creating an object inside of a function, you pass it to a function.
* **Directive** - An instruction to Angular.js to manipulate a piece of the DOM
  * "Add a Class"
  * "Hide This"
  * "Create This" 
* **Interpolation** - Creating a string by combining a string and placeholders.
* **Minification** - Shrinking the size of files for faster download.

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

###Dependency Injection and Minification

* **Minification** - Shrinking the size of files for faster download.


In the real world we want to minify our js files so they are faster to download. Many minifiers will replace variables with shorter one letter variables to save space. This can be an issue with the **dependency injection** method we used earlier.

Before:


```
  var myApp = angular.module('myApp', ['ngMessages']);

  myApp.controller('mainController', function($scope, $log) {
      console.log($scope, $log);
  });

```
After:

```
  var myApp=angular.module("myApp",["ngMessages"]);myApp.controller("mainController",function(o,l){console.log(o,l)});

```

See how the params were replaced with single letter variables, unfortunately this will throw an error now, but there is an alternative method.

See below the updated version of the sample code. The second parameter we pass to the `controller` is now an array. In that array you pass in the dependiencies as strings, with the final element in the array being the original function that passes in the variables. Angular knows to pass in the initial elements in the array into the params, so when you minify this it will now not break when the variables change. Remember, the order matters here, they match up by index.

Minify here: [http://refresh-sf.com/](http://refresh-sf.com/)

```
var myApp = angular.module('myApp', ['ngMessages']);

myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
    $log.log($scope);
}]);

```

See minified version below with updated variable names.

```
var myApp=angular.module("myApp",["ngMessages"]);myApp.controller("mainController",["$scope","$log",function(o,l){l.log(o)}]);

```


###Scope and Interpolation

In Angular & Handlebars you can use **Interpolation**. **Interpolation** means creating a string by combining a string and placeholders. The example below shows how you can use Angular and Handlebars to interpolate the *name* variable and a string.

```
    <div ng-controller="mainController">
        <h1>{{ name + ", How are you?"}}.</h1>
    </div>

```

Within your `app.js` file you can also demonstrate how it will sync the data automatically. See below we inject the dependencies `$scope` and `$timeout` into the project, then we set the scope variable `name` equal to a string, but then after 3 seconds using the $timeout feature we change it. In the browser it will be the initial name "Jeff" for 3 seconds then switch to "Everybody".

```
var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.name = "Jeff";
    
    $timeout(function() {
        $scope.name = "Everybody";
    }, 3000);
}]);

```


###Directives and Two Way Data Binding

**Directives** are ways to manipulate the pieces of the DOM to do what you want it to do. "Hide This", "Add a class to this", and "Create this" are example of things you can do with Directives


We've already used the `ng-app` and `ng-controller` directives. Now we are going to use the  `ng-model` directive to create two way data binding. This live updates user input into data then live outputs it to the screen.

The set up is easy. Within your `index.html` you can set a `ng-model` attribute on a input box to be equal to a `$scope` variable name. See we also *interpolate* using handlebars in the `<h1>` tag the same `$scope` variable.

```
    <div ng-controller="mainController">
       <div>
          <label>What is your twitter handle?</label>
          <input type="text" ng-model="handle"/>
       </div>
       </ hr>
       <h1>twitter.com/{{ handle }}</h1>
    </div>

```

Over in our `app.js` file we simple just create the `$scope.handle` variable. Right now we set it to nothing, but when you launch the application you will see that it will live update the `handle` variable within the `<h1>` based on the input.

```
var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', function($scope) {
    
     $scope.handle = '';
    
}]);

```

You can also do two way data binding and apply filters to the data that comes in, and output the filtered data. For Example in your `app.js`, after you inject the `$filter` dependency you can create a function that returns the lowercase version of the `handle` variable.

```
myApp.controller('mainController', ['$scope', '$filter', function($scope, $filter) {
    
    $scope.handle = '';
    $scope.lowercaseHandle = function() {
        return $filter('lowercase')($scope.handle);
    } 

}]);

```

Then in your html, you can just call that function instead of passing it `handle` directly.

```
  <h1>twitter.com/{{ lowercaseHandle() }}</h1>

```


###Watchers and the Digest Loop

JavaScript Event Loop is extended with Angular to make things easier. You have the JS event loop and then the *Angular Context* added in. When you add variables to the page, Angular knows that it's going to watch for those variables to change. These are called **watchers** that continuesly check if things have changed, this is also called the **Digest Loop**. You can use `$scope.$watch` to set up watches. Although this wouldn't be something you normally do, here is an example of what that would look like.


```
    $scope.$watch('handle', function (newValue, oldValue) {
        console.info('Changed!');
        console.log('New Value: ' + newValue);
        console.log('Old Value: ' + oldValue);
    });

```


Sometimes when you use external libraries or async code like *setTimeout* you need to use the `$apply` method so your app knows that you are want to be listeners from the *digest loop* to be listening. See the below example you use *setTimeout*, then you wrap everything inside of that *setTimeout* with the `$scope.$apply` method. This tells angular that you want the digest loop to run on this code. Without it the view won't update the handle variable when this code executes.

```
    setTimeout(function () {
        $scope.$apply(function () {
            $scope.handle = 'changedTwitterHandle';
            console.log('It Changed');
        });
    }, 3000);

```

In this use case there is a dependency that you can inject to avoid having to use setTimeout and $apply.


```
    $timeout(function() {
        $scope.handle = 'changedTwitterHangle';
        console.log('It Changed');
    }, 3000);

```


###Common Directives

Angular has many directives that do a variety of different things.

####ng-if

`ng-if` you can add to your html and set it equal to some JS expression that you can set to true or false, then that tag will show or hide depending on if it's value is true or false. See the below example we are checking with `ng-if` if the length of *handle* is equal to characters (a $scope variable we set in app.js). If it's true it will show the div, if it's false it will remove it from the DOM.

```
    <div class="alert" ng-if="handle.length !== characters">
        Must be 5 characters.
    </div>
```


####ng-show & ng-hide

`ng-show` and `ng-hide` are very similar to ng-if, but it will add a `display: none !important` with the class ng-hide. You also set it's value to a JS expression. `ng-show` with show if its true, and `ng-hide` will hide if it is true.

So the below two examples would produce the same view, just different ways of doing it.

```
    <div class="alert" ng-show="handle.length !== characters">
        Must be 5 characters.
    </div>

```


```
    <div class="alert" ng-hide="handle.length === characters">
        Must be 5 characters.
    </div>

```

####ng-class

With `ng-class` you can pass in a JSON object where the keys are class names and the values are JS expressions that return true or false. If true that class gets added to element if false it is removed. Below we use some Bootstrap classes to add different styling to the element based on the length of the *handles* variable.

```
    <div class="alert" ng-class="{ 'alert-warning': handle.length < characters, 'alert-danger': handle.length > characters }" ng-show="handle.length !== characters">
          Must be 5 characters.
    </div>

```

Now we take it a step further by adding show directives to new elements inside of the one we just created. The parent div handles the showing and hiding of the alert at all based on the length of the handle variable, while the child divs control which version of the alert is shown based on the length of the *handle* variable

```
    <div class="alert" ng-class="{ 'alert-warning': handle.length < characters, 'alert-danger': handle.length > characters }" ng-show="handle.length !== characters">
        <div ng-show="handle.length < characters">
            You have less than {{ characters }} characters.
        </div>
        <div ng-show="handle.length > characters">
            You have more than {{ characters }} characters.
        </div>
     </div>

```

####ng-repeat

Allows you to loop though a variable that is an array.

For example if you create a variable in your `$scope` that is equal to an array of objects.

```
    $scope.rules = [
        
        {rulename: "Must be 5 characters."},
        {rulename: "Must not be used elsewhere."},
        {rulename: "Must be cool"}
        
    ];

```

In your html you can sync it up and loop through it to display it on the page using `ng-repeat`, you just set it equal to "rule in rules", the second variable name being the name of the variable in $scope. Then you can call the object keys from the object. It will loop through it and create that element once for every object in the array. In this case it will be 3 `<li>` tags.

```
    <h3>Rules</h3>
    <ul>
        <li ng-repeat="rule in rules">
            {{ rule.rulename }}
        </li>
    </ul>

```

####ng-click

`ng-click` allows you to trigger a function from the $scope. You can create a function in the controller like the one below.

```
  $scope.alertClick = function () {
      alert('Clicked!');
  };

```

Then you can set `ng-click` equal to the function call. So when you click the button the function will run.

```
  <input type="button" value="click me" ng-click="alertClick()" />

```

####ng-cloak

`ng-cloak` is an Angular property that allows you to hide an element until Angular gets to thit. This prevents a flicker on slow internet connections that might cause an user to see the templating `{{}}` before Angular renders the variable.

```
  <div ng-cloak>{{ name }}</div>

```

####Finding more Directives

You can find a list of all the directives at this link: [https://docs.angularjs.org/api/ng/directive](https://docs.angularjs.org/api/ng/directive)


###XMLHTTPRequest Object & $http

Lets pretend we have a database in our project. Traditionally you would use all of this code to access your api to get data using pure Javascript. jQuery has the wrapper of $ajax that you can make this request much simpler. Below you see an example of what you would have to write to make an ajax request in Angular if you had to use pure JavaScript:

```
    var rulesrequest = new XMLHTTPRequest();
    rulesrequest.onreadystatechange = function () {
        $scope.$apply(function() {
            if(rulesrequest.readyState == 4 && rulesrequest.status == 200) {
                $scope.rules = JSON.parse(rulesrequest.responseText);
            }
        });
    };
    
    rulesrequest.open('GET', 'http://localhost:54765/api', true);
    rulesrequest.send();

```

####$http

Once you inject the `$http` dependency into your `app.js` file you can use it to make ajax requests. 

#####$http.get

In the below example we are using the [Random User API](https://randomuser.me/documentation) as an example to make a GET request. Normally you would be able to set up a server then access your own data.

In the below example you use `$http.get` and pass in the API endpoint. From there you can chain `.success` and `.error`. Success will give you the results, then you can set a $scope object to the results.

```
  $http.get('https://randomuser.me/api/')
        .success(function (result) {
            $scope.user = result.results[0];
         })
         .error(function (data, status) {
             console.log(data, error)
         });

```

Then in the HTML you can do the same templating we've been doing

```
  <div>
      <img ng-src={{user.picture.large}}>
      <p>{{user.name.title}}. {{user.name.first}} {{user.name.last}}</p>
  </div>

```

#####$http.post

You can also post to your database through Angular. Say you set up the below input box attached the the model "newRule". then you create a button that has a `ng-click` of a function *addRule*

```
    <div>
        <label>Add Rule: </label>
        <input type="text" ng-model="newRule"/>
        <a href="#" class="btn btn-default" ng-click="addRule()">Add</a>
    </div>

```

Imagin you already have your database set up with some *rules* and you have a scope variable set to it. 

* Create the `newRule` variable and set it to empty initially. This is the model the input box is based off of. 
* Create the scope function `addRule`, and with `$http.post` we pass in the endpoint we set up on our server as the first argument, then the data object we want to post to this url.
* Then on `.success` we run the function that sets the `$scope.rules` variable to the results we get back, and set `$scope.newRule` to an empty string again.
* Lastly we add the `.error` part

This code will update the rules list dynamically as we make the post request through the imput box.

```
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

```