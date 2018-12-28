// budget controller
var budgetController = (function () {

    var Expense = function (id, descrip, value) {
        this.id = id;
        this.descrip = descrip;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calPercentage = function (totalInc) {
        this.percentage = totalInc > 0 ? Math.round((this.value / totalInc) * 100) : -1;
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var Income = function (id, descrip, value) {
        this.id = id;
        this.descrip = descrip;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    var calTotal = function (type) {
        var sum = 0;

        data.allItems[type].forEach(function (cur, index, arr) {
            sum += cur.value;
        });

        data.totals[type] = sum;
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            //create id
            if (data.allItems[type].length === 0) {
                ID = 0
            } else {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }

            //create item bease on type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //push to data structre
            data.allItems[type].push(newItem);

            //return added item
            return newItem;
        },

        calBudget: function () {

            // cal total income & expenses
            calTotal('exp');
            calTotal('inc');

            // cal budget : income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // cal percentage 
            data.percentage = data.totals.inc > 0 ? Math.round((data.totals.exp / data.totals.inc) * 100) : -1;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        deleteItem: function (type, id) {
            var ids, index;
            ids = data.allItems[type].map(function (cur, index, arr) {
                return cur.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calPercentage: function () {
            data.allItems.exp.forEach(function (cur) {
                cur.calPercentage(data.totals.inc);
            });
        },

        getPercentage: function () {
            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });

            return allPerc;
        },

        test: function () {
            console.log(data);
        }
    };

})();

// ui controller
var UIController = (function () {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescrip: '.add__description',
        inputVal: '.add__value',
        inputBut: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incLabel: '.budget__income--value',
        expLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    var formatNumber = function (num, type) {
        var numSplit;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');
        int = numSplit[0];
        //if (int.length > 3) {
        //    int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
        //}
        int = parseInt(int).toLocaleString();

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    var nodelistForeach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc or exp
                descrip: document.querySelector(DOMstrings.inputDescrip).value,
                val: parseFloat(document.querySelector(DOMstrings.inputVal).value)
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // create html string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%descrip%</div><div class="right clearfix"><div class="item__value" >%value%</div ><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id = "exp-%id%" ><div class="item__description">%descrip%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div >';
            }

            // replace placeholder text with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%descrip%', obj.descrip);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            //insert html into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMstrings.inputDescrip + ', ' + DOMstrings.inputVal);

            fieldsArray = Array.prototype.slice.apply(fields);

            fields.forEach(function (current, index, array) {
                current.value = "";
            });

            //fieldsArray.forEach(function (current, index, array) {
            //    current.value = "";
            //});

            //fieldsArray[0].focus();
            fields[0].focus();
        },

        displayBudget: function (obj) {
            var type;
            type = obj.budget >= 0 ? 'inc' : 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expLabel).textContent = formatNumber(obj.totalExp, 'exp');
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage > 0 ? obj.percentage + '%' : '---';
        },

        deleteListItem: function (id) {
            var el = document.getElementById(id);
            el.parentNode.removeChild(el);
        },

        displayPercentage: function (percentage) {
            var fields;

            fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);

            nodelistForeach(fields, function (current, index) {
                current.textContent = percentage[index] > 0 ? percentage[index] + '%' : '---';
            });
        },

        displayMonth: function () {
            var now, year, month;
            now = new Date();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changeType: function () {
            var fields;
            fields = document.querySelectorAll(DOMstrings.inputType + ',' + DOMstrings.inputDescrip + ',' + DOMstrings.inputVal);

            nodelistForeach(fields, function (cur, index) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBut).classList.toggle('red');
        },

        getDOMStrings: function () {
            return DOMstrings;
        }
    };

})();

//global app controller
var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOMStrings = UICtrl.getDOMStrings();
        document.querySelector(DOMStrings.inputBut).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOMStrings.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOMStrings.inputType).addEventListener('change', UICtrl.changeType);
    };

    var updateBudget = function () {
        var budget;
        // 1.cal budget
        budgetCtrl.calBudget();

        // 2.return the budget
        budget = budgetCtrl.getBudget();

        // 3.display on the ui
        UICtrl.displayBudget(budget);
    };

    var updatePercentage = function () {
        var percentage;
        // 1. cal percentage
        budgetCtrl.calPercentage();

        // 2. read from budget controller
        percentage = budgetCtrl.getPercentage();

        // 3. display on UI
        UICtrl.displayPercentage(percentage);
    };

    var ctrlAddItem = function () {
        var input, newItem;
        // 1.get the field input data
        input = UICtrl.getInput();

        if (input.descrip !== "" && !isNaN(input.val) && input.val > 0) {
            // 2.add the item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.descrip, input.val);

            // 3.add item into ui
            UICtrl.addListItem(newItem, input.type);

            // 4. clear input fields
            UICtrl.clearFields();

            // 5. cal & update budget
            updateBudget();

            // 6. update & show percentage
            updatePercentage();
        }
    };

    var ctrlDeleteItem = function (event) {
        var itemId, splitId, type, ID;

        itemId = event.target.parentNode.parentNode.parentNode.id;

        if (itemId) {
            // inc-* or exp-*
            splitId = itemId.split('-');
            type = splitId[0];
            ID = parseInt(splitId[1]);

            // 1. delete item from data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. delete item from UI
            UICtrl.deleteListItem(itemId);

            // 3. update & show new budget
            updateBudget();

            // 4. update & show percentage
            updatePercentage();
        }
    };

    return {
        init: function () {
            console.log('started!');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            UICtrl.displayMonth();
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();