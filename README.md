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
* **Normalize** - To make consistent to a standard
* **Singleton** - the one and only copy of an object

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

`ng-cloak` is an Angular property that allows you to hide an element until Angular gets to it. This prevents a flicker on slow internet connections that might cause an user to see the templating `{{}}` before Angular renders the variable.

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

###Multiple Controllers and Views

You can have as many controllers as you want within Angular, that even use the same $scope variable names. Below you see two controllers declared `mainController` and `secondController`. There have different scopes and you can access  both of them within the same view.

```

var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', function($scope) {
    $scope.name = "Main";
}]);


myApp.controller('secondController', ['$scope', function($scope) {
    $scope.name = "Second";
}]);


```

In the view:

```
    <div class="container">
       <div ng-controller="mainController">
           <h1>{{ name }}</h1>
       </div>
	</div>
        
    <div class="container">
       <div ng-controller="secondController">
           <h1>{{ name }}</h1>
       </div>
	</div>

```

###Single Page Apps and the Hash

There's and old concept in HTML that you anchor elements on the page with an id, and your able to call that id with an href on an anchor tag. The set up is as below:

Below you see an element with an id of `bookmark`, this is the element you wish to scroll to when you click the bookmark

```
  <p id='bookmark'>
    Hello World                      
  </p>

```

Then somewhere else you make an anchor tag that has an href of `#bookmark` which when clicked will bring you to the area on the page where the above element is tagged, matching the id name to the href name for the destination.


```
  <div>
    <a href="#bookmark">Click here to go to bookmark</a>
  </div>

```

This idea has been around for a while in html and allows you to bookmark locations on the page. This `#bookmark` is also known as a **fragment identifier**. 


So in JavaScript there is an event called `hashchange` which listens for the hash changing. So if you were to implement the below code with the above code when you click the link it will fire the console.log. Its important to note that the **fragment identifier** doesn't even need to exist on the page for this event listener to register a hash change. 

```
window.addEventListener('hashchange', function () {
   console.log('hash changed! : ' + window.location.hash); 
});

```


Now imaging for a single page app you could have these *hashchange* events trigger events in JavaScript, maybe sending over new content or causing something else to change when a certain hash exists. Since the page doesn't exist, this is the beginning of a Single Page App and the beginning of how Angualar approaches them.

```
    <div>
        <a href="#bookmark/1">Click here to go to bookmark 1</a>
        </br>
        <a href="#bookmark/2">Click here to go to bookmark 2</a>
        </br>
        <a href="#bookmark/3">Click here to go to bookmark 3</a>
    </div>

```


```
window.addEventListener('hashchange', function () {
    
   var hash = window.location.hash;
    
    if(hash === '#bookmark/1'){
        console.log('Bookmark One');
    }
    
    if(hash === '#bookmark/2'){
        console.log('Bookmark Two');
    }
    
    if(hash === '#bookmark/3'){
        console.log('Bookmark Three');
    }
    
});

```


###Routing, Templates, and Controllers

####Part One

See the `example_one` folder for the working example

You can inject the `$location` service and see that it has the ability to see the pathname within it by calling the `$location.path()` method. It will return the hash that is currently in place on page load. This is just an example showing that angular can get the hash

```
var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$location', '$log', function($scope, $location, $log) {
    
    $log.info($location.path());
 
}]);


```

You can find the latest version of Angular [here](https://code.angularjs.org/). (The last one that says 'rc' next to it's name) Once you click into it you will see a *service* file called `angular-route.js`, a module called *ngRoute* and it allows you to deal with routes and states within your app.

After we add the service in out index.html file by linking the `angular-route.js` file after we load angular, we can add it to our app. First we can inject the dependency into our app. It's called `ngRoute`:

```
var myApp = angular.module('myApp', ['ngRoute']);

```

First we need to make *template* html files. These are partial html files that will be injected into our main one. No need for DOCTYPE etc, this will only be raw html without any style or scripts.

Make a folder in the main level named `pages` with three files inside `main.html`, `second.html`, and `third.html`. You can add basic "Hello from Main.js file" within tags in all of these new files.

Next back in our `index.html` file that contains all the dependencies and has the `<html lang="en-us" ng-app="myApp"></html>` loaded we can add the below line of code within the body. `ng-view` will inject current content based on the route into the app. This content will come from the html files within the `pages` folder we just made:

```
  <div ng-view></div>

```


Lastly we need to link everything up. Back in our `app.js` file we injected the `ngRoute` dependency, then we can call `myApp.config`, pass in a param of `$routeProvider`, then chain `when` methods. The `when` methods take a first object as a pathname (anything that comes after the hash), followed by a second parameter which has a `templateUrl` and `controller` key. `templateUrl` links up the template page you would like to inject into the `ng-view` when that route is triggered un the url. `controller` attaches controllers to that view.

Below we chain 3 `when`s.

```
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
       });
  });


```
Lastly, we create multiple controllers to reflect the ones we attached above.


```
  myApp.controller('mainController', ['$scope', '$location', '$log', function($scope, $location, $log) {
    
    $log.info('First Controller : ' + $location.path());
 
  }]);


  myApp.controller('secondController', ['$scope', '$location', '$log', function($scope, $location, $log) {
    
    $log.info('Second Controller : ' + $location.path());
 
  }]);


  myApp.controller('thirdController', ['$scope', '$location', '$log', function($scope, $location, $log) {
    
    $log.info('Third Controller : ' + $location.path());
 
  }]);


```

So when you launch you app, going to `/#` empty hash will serve the `main.html` template into the `index.html` file, `/#second` will serve `second.html`, and `/#third` will serve `third.html`.

So, you can add the routes to links, for example in the `index.html` you can add the routes we created as *href*s in the nav.

```
  <nav>
    <ul class="nav navbar-nav navbar-right">
		<li><a href="#"><i class="fa fa-home"></i> Home</a></li>
        <li><a href="#/second">Second</a></li>
        <li><a href="#/third">Third</a></li>
	</ul>
  </nav>
	
```

####Part Two

You can also do routes that pass in params. For example below we have `/example` route, but we also have `/example/:num`. Adding the `:` allows you to pass that part of the url in as a parameter. So they both use the same template `example.html` but one passes in the `:num` param:

```
  myApp.config(function($routeProvider) {
   $routeProvider
       .when('/example', {
             templateUrl: 'pages/example.html',
             controller: 'exampleController'
       })
       .when('/example/:num', {
             templateUrl: 'pages/example.html',
             controller: 'exampleController'
       })
  });


```

In the controller you can inject the dependency `$routeParams` from the `ngRoute` module. When you `$log` `$routeParams` you will see that it is an object containing all the params you passed into the param from above, in this case just `/:num`. We set `$scope.num` to `$routeParams.num` then it's available in the view. If the user goes to `#/example/123` num will equal **123**.

```
  myApp.controller('exampleController', ['$scope', '$location', '$log', '$routeParams', function($scope, $location, $log, $routeParams) {
    
    $log.info('Example Controller : ' + $location.path());
    $log.info($routeParams);
    
    $scope.name = 'Example';
    $scope.num = $routeParams.num || 0;
 
  }]);


```

Then in `example.html` you can have something like this:

```
  <h1>This is the {{ name }} controller</h1>

  <p>You are on {{ name }} page number {{ num }}. </p>

```



###Services and Singletons

A *Singleton* is an object there there is only one copy of. You can imagine that you have two controllers. We mass in the `$log` param. one would think that $log would be it's own instance within each function but it is not. `$log` is a *singleton*. If you load the main page, the `testOne` property will be set. Then when you go to the second page, both the `testOne` and the `testTwo` properties exist.


```
myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
    $log.testOne = "Test One";
    console.log($log);
}]);

myApp.controller('secondController', ['$scope', '$log', '$routeParams', function($scope, $log, $routeParams) {
    $log.testTwo = "Test Two";
    console.log($log);
    
}]);

```


Not all services are *singletons* though. `$scope` is an exception to the rule. It is a *child scope* inherited from a parent and unique for every controller.

###Custom Services

Creating custom services is easy to do. Once you initialize your `myApp` module you can create a service by simply passing the `service` method a service name and function. Once you do that it's like creating a constructor. You can add methods and variables that you would like to provide in your service. 

```
myApp.service('serviceName', function() {
    var self = this;
    this.name = "John Doe";
    this.nameLength = function(){
        return self.name.length
    }
});

```

Once you create the service you can inject it into controllers just like you would for any other service. The service you create is also a *singleton*. When you set the `$scope` to be equal to a service variable, the scope won't update automatically,  you must add a `$watch` to it to update the service name when you switch between pages in a SPA.

```
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


```

Your HTML might look like something like this:

`main.html`

```
  <h1>This is Main.</h1>
  </hr>
  <input type='text' ng-model='name'>

```

`second.html`

```
  <h1>This is second.</h1>
  <h3>Scope route value (on second page): {{ num }}</h3>
  </hr>
  <input type='text' ng-model='name'>

```



###Reusable Components

Web components is the concept of creating reusable html containers that you can populate with other html. So you html is not so repetitive. Custom directives is Angular's solution to this.


####Normalize

Normalize means to make consistent to a standard. To convert a string or numbers etc to a consistent state. This is an important concept to remember when it comes to *custom directives*.

In Angular you can create a custom directive. On the html side it looks something like the below. Notice that the tag and the attribute are both using snake case (with hyphens). This makes it east to read, but also is the standard because Angular's JavaScript will normalize these into camel case.

```
  <search-result result-link-href="#"></search-result>

```

The reason why Angular converts it to camel case is because variable names cannot contain hyphens. This is because a hyphen can be mistaken as the *minus* operator. This would throw an error: `var search-link-href = "#";`. This would not throw an a error `var searchLinkHref = "#";`  So, Angular converts the hyphened names into camel case, Angular *Normalizes* it into a JavaScript readable format, and vis versa.


###Custom Directives

Making a custom directive is easy. When you have a snippet of code that will be used through out your app, you can use a directive to send over a template.

Below you see you can all the *directive* method, and first pass it a *normalized* name followed by an object. The name will be in camel case in the directive, but on the front end (in the html) it will be snake case with hyphens. 

In the object you can set the template key to the html that directive contains. Then the *replace* key defaults to false, but you can change it to true if would like the target element on the fronting to be replaced by the template instead of going inside of it.

`app.js`:

```
  myApp.directive('searchResults', function() {
    return {
        template: '<a href="#" class="list-group-item"><h4 class="list-group-item-heading">Doe, John</h4><p class="list-group-item-text">555 Main Street</p></a>',
        replace: true
    }
  });

```

Below you can see what this directive would look like on the front end. There are two common ways to call it. One is to use it as a tag `<search-results>` the other is to add it as an attribute like the example below. Both of these will be replaced with the above template.

`main.html`

```

  <div class="list-group">
    <search-results></search-results>
    <div search-results></div>
  </div>

```


It's also interesting to note you can control which way the directive can be implemented. The directive defaults to allowing Elements and attributes like the above html. The restrict key for the directive can be added to the object, which you can then pass `E` for element and `A` for attribute if you would like to restrict which one your devs can use. 

```
  restrict: 'AE'

```

Also `C` for class and `M` for comment are available

```
  restrict: 'AECM'

```

One the front end the class and comment versions look like this:

```
  <div class="list-group">
    <div class='search-results'></div>
    <!-- directive: search-results -->
  </div>

```