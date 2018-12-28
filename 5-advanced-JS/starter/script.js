//function constructor

//var john = {
//    name: 'john',
//    bod: 1990,
//    job: 'teacher'
//};

//var Person = function (name, bod, job) {
//    this.name = name;
//    this.bod = bod;
//    this.job = job;
//}


//Person.prototype.calAge = function () {
//    console.log(2016 - this.bod);
//}

//Person.prototype.lastName = 'simth';

//var john = new Person('john', 1990, 'teacher');
//var jane = new Person('jane', 1980, 'nurse');
//var mike = new Person('mike', 1948, 'retired');

//john.calAge();
//jane.calAge();
//mike.calAge();

//console.log(john.lastName);
//console.log(jane.lastName);
//console.log(mike.lastName);



//object create
//var personProto = {
//    calAge: function () {
//        console.log(2016 - this.bod);
//    }
//};

//var john = Object.create(personProto);
//john.name = 'john';
//john.bod = 1990;
//john.job = 'teacher';

//var jane = Object.create(personProto, {
//    name: { value: 'jane' },
//    bod: { value: 1986 },
//    job: { value: 'designer' }
//});

// primitives vs objects
//var a = 23;
//var b = a;
//a = 46;
//console.log(a);
//console.log(b);

//var obj1 = {
//    name: 'john',
//    age: 23
//};

//var obj2 = Object.assign({}, obj1);
//obj1.age = 30;
//console.log(obj1);
//console.log(obj2);

//functions
//var age = 23;
//var obj = {
//    name: 'jona',
//    city: 'lisbon'
//};

//function change(a, b) {
//    a = 30;
//    b.city = 'sf';
//}

//change(age, obj);
//console.log(age, obj);

//function as arguments

//var years = [1990, 1965, 1937, 2006, 1998];

//function arryCal(arr, fn) {
//    var res = [];
//    for (let i in arr) {
//        res.push(fn(arr[i]));
//    }
//    return res;
//}

//function calAge(el) {
//    return 2016 - el;
//}

//function isFull(el) {
//    return el >= 18;
//}

//function maxHR(el) {
//    if (el >= 18 && el <= 81) {
//        return Math.round(206.9 - (0.7 * el));
//    } else {
//        return -1;
//    }
//}

//var age =arryCal(years, calAge);

//console.log(arryCal(age, isFull));

//console.log(arryCal(age, maxHR));

//function returning function

//function intQuest(job) {
//    if (job === 'designer') {
//        return function (name) {
//            console.log(name + ',ex-design?');
//        }
//    } else if (job === 'teacher') {
//        return function (name) {
//            console.log(name + ', ex-teach?');
//        }
//    } else {
//        return function (name) {
//            console.log('hi ' + name);
//        }
//    }
//}

//var teacherQuest = intQuest('teacher');
//console.log(teacherQuest('john'));
//teacherQuest('john');
//intQuest('teacher')('mark');

//immediate invoke function expression iife
//function game() {
//    var score = Math.random() * 10;
//    console.log(score >= 5);
//}

//game();

//(function () {
//    var score = Math.random() * 10;
//    console.log(score >= 5);
//})();


//(function (goodLuck) {
//    var score = Math.random() * 10;
//    console.log(score >= 5 - goodLuck);
//})(5);

//(function() {
//    console.log(5);
//})();


//closures

//function retire(retireAge) {
//    var a = ' year left.';
//    return function (dob) {
//        var age = 2016 - dob;
//        console.log((retireAge - age) + a);
//    }
//}

//var retireGer = retire(65);
//var retireIceland = retire(67);

//retireGer(1990);
//retireIceland(1990);


//function intQuest(job) {
//    return function (name) {
//        if (job === 'designer') {
//            console.log(name + ',ex-design?');
//        } else if (job === 'teacher') {
//            console.log(name + ', ex-teach?');
//        } else {
//            console.log('hi ' + name);
//        }
//    }
//}

//intQuest('teacher')('mike');

//bind, call & apply
//var john = {
//    name: 'jone',
//    age: 26,
//    job: 'teacher',
//    present: function (style, time) {
//        if (style === 'formal') {
//            console.log('good ' + time + ' I\'m ' + this.name + ', i\'m a ' + this.job + ' i\'m ' + this.age);
//        } else if (style === 'friendly') {
//            console.log('what\'s up? ' + time + ' I\'m ' + this.name + ', i\'m a ' + this.job + ' i\'m ' + this.age);
//        }
//    }
//};

//var emily = {
//    name: 'emily',
//    age: 35,
//    job:'designer',
//};

//john.present('formal', 'morning');

//john.present.call(emily, 'friendly', 'afternoon');

////john.present.apply(emily, ['friendly', 'evening']);

//var johnFriendly = john.present.bind(john, 'friendly');

//johnFriendly('noon');
//johnFriendly('night');


//var emilyFormal = john.present.bind(emily, 'formal');
//emilyFormal('evening');


//var years = [1990, 1965, 1937, 2006, 1998];

//function arryCal(arr, fn) {
//    var res = [];
//    for (let i in arr) {
//        res.push(fn(arr[i]));
//    }
//    return res;
//}

//function calAge(el) {
//    return 2016 - el;
//}

//function isFull(limit, el) {
//    return el >= limit;
//}

//var ages = arryCal(years, calAge);

//var fullJap = arryCal(ages, isFull.bind(this, 20));

//console.log(ages);
//console.log(fullJap);

/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

(function () {
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQ = function () {
        console.log(this.question);
        for (let i in this.answers) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkA = function (ans, callback) {
        var sc;
        if (ans === this.correct) {
            console.log('correct!');
            sc = callback(true);
        } else {
            console.log('wrong!');
            sc = callback(false);
        }

        this.displayS(sc);
    }

    Question.prototype.displayS = function (sc) {
        console.log('current score: ' + sc);
        console.log('--------------------');
    }

    var q1 = new Question('Is JavaScript the coolest programming language in the world?', ['Yes', 'No'], 0);
    var q2 = new Question('What is the name of this course\'s teacher?', ['john', 'emily', 'jones'], 2);
    var q3 = new Question('What does best describe coding?', ['boring', 'hard', 'fun', 'tedious'], 2);

    var questions = [q1, q2, q3];

    function score() {
        var sc = 0;
        return function (iscorrect) {
            if (iscorrect) {
                sc++;
            }
            return sc;
        }
    }

    var keepSc = score();

    function nextQ() {
        var random = Math.floor(Math.random() * questions.length);

        questions[random].displayQ();

        var answer = prompt('Please select.');

        if (answer !== 'exit') {
            questions[random].checkA(parseInt(answer), keepSc);
            nextQ();
        }
    }

    nextQ();

})();
