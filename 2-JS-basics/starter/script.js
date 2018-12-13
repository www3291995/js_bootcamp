///****************************
// * variable and data types
// ****************************/

//var firstName = 'John';
//console.log(firstName);

//var lastName = 'Smith';
//var age = 20;

//var fullAge = true;
//console.log(fullAge);

//var job;
//console.log(job);

//job = 'teacher';
//console.log(job);

////var 3year = 3;

///****************************
// * variable mutation & type corecion
// ****************************/
//var firstName = 'John';
//var age = 20;

//console.log(firstName + ' ' + age);

////type coercion
//var job, isMarried;
//job = 'teacher';
//isMarried = false;

//console.log(firstName + ' is a ' + age + ' year old ' + job + ', is he married? ' + isMarried);

////variable mutation
//age = 'twenty eight';
//job = 'driver';

////alert(firstName + ' is a ' + age + ' year old ' + job + ', is he married? ' + isMarried);

//var lastName = prompt('what is his last name?');
//console.log(lastName);

//***************************
//basic operation
//***************************
//var year, yearJohn, yearMark;
//now = 2018;
//yearJohn = now - 28;

////math operator
//console.log(yearJohn);
//console.log(now + 1);

////logical operator

////typeof operator
//console.log(typeof x);

////operator precedure

//**********************************
//functions
//**********************************
//function calculateAge(birthYear) {
//    return 2018 - birthYear;
//}

//var ageJohn = calculateAge(1990);
//console.log(ageJohn);

//function yearUntilRetirement(birthYear, firstName) {
//    var age = calculateAge(birthYear);
//    var retirement = 65 - age;
//    if (retirement > 1)
//        console.log(firstName + ' in ' + retirement + ' years ');
//    else
//        console.log(firstName + ' retired ');
//}

//yearUntilRetirement(1990, 'john');
//yearUntilRetirement(1948, 'john');



//**********************************
//function statement & expression
//**********************************

//function decration
//function whatDoYouDo(job, firstName) {}

//function expression
//var whatDoYouDo = function (job, firstName) {
//    switch (job) {
//        case 'teacher':
//            return firstName + ' teach';
//        case 'driver':
//            return firstName + ' drive';
//        case 'designer':
//            return firstName + ' design';
//        default:
//            return firstName + ' sth else';
//    }
//}

//console.log(whatDoYouDo('teacher', 'john'));

//*********************************
//Array
//*********************************

//names = ['1', '2', '3'];

//console.log(names.length);

//names[0] = 'aaa';
//console.log(names);


//names[names.length] = 'aaa';
//console.log(names);

//names.push('cool');
//console.log(names);

//console.log(names.unshift('mr'));
//console.log(names);

//names.pop();
//console.log(names);

//names.shift();
//console.log(names);

//console.log(names.indexOf('3'));


/*****************************
* CODING CHALLENGE 3
*/
//const bills = [124, 48, 268];
//var tip_bill = [];

//var tips = function tipps(bills) {
//    if (bills < 50) {
//        return bills * 0.2;
//    } else if (bills < 200) {
//        return bills * 0.15;
//    } else {
//        return bills * 0.1;
//    }
//}

//tip_bill = [bills[0] + tipps(bills[0]), bills[1] + tips(bills[1]), bills[2] + tips(bills[2])];
//console.log(tip_bill);


/*****************************
* objects
*/

//var john = {
//    fn: 'john',
//    ln: 'smith',
//    bd: 1990,
//    family: ['jane', 'amrk', 'emly'],
//    job: 'teacher',
//    ismarried: false
//}

//console.log(john.fn);
//console.log(john['ln']);


/*****************************
* objects & methods
*/

//var john = {
//    fn: 'john',
//    ln: 'smith',
//    bd: 1990,
//    family: ['jane', 'amrk', 'emly'],
//    job: 'teacher',
//    ismarried: false,
//    calAge: function () {
//        this.age = 2018 - this.bd;
//    }
//};

//john.calAge();
//console.log(john);


/*****************************
* loops & iteration
*/

//var john = ['John', 'Smith', 1990, 'designer', false];

//for (let i of john) {
//    console.log(i);
//}


/*****************************
* CODING CHALLENGE 5
*/

var john = {
    bills: [124, 48, 268, 180, 42],
    calTips: function () {
        this.tips = [];
        this.total = [];
        for (let i = 0; i < this.bills.length; i++) {
            if (i <= 50) {
                this.tips[i] = this.bills[i] * 0.2;
            } else if (i <= 200) {
                this.tips[i] = this.bills[i] * 0.15;
            } else {
                this.tips[i] = this.bills[i] * 0.1;
            }
            this.total[i] = this.tips[i] + this.bills[i];
        }
    }
};

john.calTips();
console.log(john);