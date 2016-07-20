var Person = function (firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
};

function logPerson(){
  var john = new Person('john', 'doe');
  console.log(john);
}

logPerson();




function logPerson(person) {
  
  console.log(person);
}

var john = new Person('john', 'doe');
logPerson(john);