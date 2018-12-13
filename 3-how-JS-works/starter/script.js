///////////////////////////////////////
// Lecture: Hoisting

//function
//calAge(1990);

//function calAge(year) {
//    console.log(2016 - year);
//}

//let retire = function(year){
//    console.log(65 - (2016 - year));
//}

//retire(1990);

////variable

////console.log(age);
////var age = 23;


//function foo() {
//    console.log(age);
//    var age = 65;
//    console.log(age);
//}

//foo();
//console.log(age);

///////////////////////////////////////
// Lecture: Scoping


// First scoping example


//var a = 'Hello!';
//first();

//function first() {
//    var b = 'Hi!';
//    second();

//    function second() {
//        var c = 'Hey!';
//        console.log(a + b + c);
//    }
//}




// Example to show the differece between execution stack and scope chain


//var a = 'Hello!';
//first();

//function first() {
//    var b = 'Hi!';
//    second();

//    function second() {
//        var c = 'Hey!';
//        third();
//    }
//}

//function third() {
//    var d = 'John';
//    console.log(a + + d);
//}




///////////////////////////////////////
// Lecture: The this keyword

//console.log(this);

//function calAge(year) {
//    console.log(2016 - year);
//    console.log(this);
//}

//calAge(1990);


var john = {
    name: 'john',
    bod: 1990,
    calAge: function () {
        console.log(this);
        console.log(2016 - this.bod);

        //function inner() {
        //    console.log(this);
        //}
        //inner();
    }
};

john.calAge();

var mike = {
    name: 'mike',
    bod: 1984
};

mike.calAge = john.calAge;
mike.calAge();