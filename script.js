/*Primjer kako definirati module*/
// closure i ieea

/*
var BudgetController = (function(){
	var x = 22;
	var add = function(a){
		return x + a;
	}
	return {
		publicTest: function(b){
			return add(b);
		}
	}
})();

var UIController = (function(){
	// code
})();

var controller = (function(BudgetCntl, UICntl){
	var z = BudgetCntl.publicTest(5);
	return {
		ispisiRezultat: function(){
			console.log(z);
		}
	}
})(BudgetController, UIController);

controller.ispisiRezultat();
*/


////////////////////******** JavaScript kod Aplikacije ********/////////////////////////

var BudgetController = (function(){

	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};
	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};
	Expense.prototype.calculatePercentage = function(totals){
		if(totals > 0){
			this.percentage = Math.round((this.value / totals) * 100);
		}
	};
	Expense.prototype.getPercentage = function(){
		return this.percentage;
	};

	var Data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1

	};
	var calculateTotals = function(type){
			var sum = 0;
			Data.allItems[type].forEach(function(current){
				sum += current.value;
			});
			Data.totals[type] = sum;
	};
	return {
		addItem: function(type, desc, val){
			var newItem, ID;
			// Stavranje id - a za novi unos
			if(Data.allItems[type].length > 0){
				ID = Data.allItems[type][Data.allItems[type].length - 1].id + 1;	
			}else{
				ID = 0;
			}
			// Kreiranje objekta tipa Expense ili Income
			if(type === 'exp'){
				newItem = new Expense(ID, desc, val);
			}else if(type === 'inc'){
				newItem = new Income(ID, desc, val);
			}
			// Spremanje objekta u niz
			Data.allItems[type].push(newItem);
			return newItem;
		},
		deleteItem: function(type, id){
		var ids;
		//dohvaćanje svih id-ova u nizu 
		ids = Data.allItems[type].map(function(current){
			return current.id;
		});
		// traženje indeksa određenog elementa
		index = ids.indexOf(id);
		if(index !== -1){
			Data.allItems[type].splice(index, 1);
		}

		},
		calculateBudget: function(){
		// 1. Izracunaj prihode i rashode
		calculateTotals('exp');
		calculateTotals('inc');
		// 2. Izracunaj trenutni budet (%)
		Data.budget = Data.totals.inc - Data.totals.exp;
		if(Data.totals.inc > 0){
			Data.percentage = Math.round((Data.totals.exp / Data.totals.inc) * 100);	
		}
		},

		calculatePercentages: function(){
			Data.allItems.exp.forEach(function(current){
				current.calculatePercentage(Data.totals.inc)
			});
		},

		getPercentages: function(){
			var percentages = Data.allItems.exp.map(function(current){
				return current.getPercentage();
			});
			return percentages;
		},

		getTotals: function(){
			return{
				expenses: Data.totals.exp,
				income: Data.totals.inc,
				budget: Data.budget,
				percentage: Data.percentage
			}
		},
		testing: function(){
			return Data;
		}
	};

})();

var UIController = (function(){
	var DOMStrings = {
		type: '.valueType',
		description:'.addDescription',
		value: '.addValue',
		add: '.addButton',
		incomeContainer: '.income',
		expenseContainer: '.expenses',
		budgetLable: '.availableBudget',
		incomeLable: '.incomeTopNumber',
		expenseLable: '.expensesTopNumber',
		percentageLable: '.expensesTopPercentage',
		statusContainer: '.statusContainer',
		expensesPercentageLabel : '.item__percentage',
		yearLable: '.budgetYear'

	};

	var formatNumber = function(num, type){
		var numSplit, int, dec, type;
		num = Math.abs(num);
		num = num.toFixed(2);
		numSplit = num.split('.');
		int = numSplit[0];
		dec = numSplit[1];
		if(int.length > 3){
			int = int.substr(0, int.length - 3) + ',' + int.substr(int.length-3, int.length);
		}

		type = type === 'exp' ? '-' : '+';
		return type + ' ' + int + '.' + dec;
	};

	return {
		getInputData:function(){
			return{
				type: document.querySelector(DOMStrings.type).value,
				description : document.querySelector(DOMStrings.description).value,
				value: parseFloat(document.querySelector(DOMStrings.value).value)			
			};
		},
		addListItem: function(obj, type){
			var html, newHTML, element;
			// Krirati HTML string s placeholderom
			if(type === 'inc'){
			element = DOMStrings.incomeContainer;
			html ='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="fa fa-trash">delete</i></button></div></div></div>';
			}else if (type === 'exp'){
			element = DOMStrings.expenseContainer;
			html ='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="fa fa-trash"></i></button></div></div></div>';
			}
			// Zamjeniti placeholder s odgovarajućim vrijednostima
			newHTML = html.replace('%id%', obj.id);
			newHTML = newHTML.replace('%description%', obj.description);
			newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

			// Unesi HTML u DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
		},

		deleteListItem: function(selectorId){
			var element = document.getElementById(selectorId);
			element.parentNode.removeChild(element);
		},

		clearFields: function(){
			var fields, fieldsArray;
			fields = document.querySelectorAll(DOMStrings.description + ', ' + DOMStrings.value);
			// querySelectorAll vraca listu pa je trebamo pretvoriti u niz
			fieldsArray = Array.prototype.slice.call(fields);
			// brisemo vrijednosti koje se nalaze u poljima
			fieldsArray.forEach(function(current, index, array){
				current.value = ""; 
			});
		},

		displayBudget: function(data){
			var type;
			type = data.budget > 0 ? 'inc': 'exp';
			document.querySelector(DOMStrings.budgetLable).textContent = formatNumber(data.budget, type);
			document.querySelector(DOMStrings.incomeLable).textContent = formatNumber(data.income, 'inc');
			document.querySelector(DOMStrings.expenseLable).textContent = formatNumber(data.expenses, 'exp');
			
			if(data.percentage > 0){
				document.querySelector(DOMStrings.percentageLable).textContent = data.percentage + '%';
			}else{
				document.querySelector(DOMStrings.percentageLable).textContent = '-';
			}
		},
		displayPercentages: function(percentages){
			// vraca listu
			var fields = document.querySelectorAll(DOMStrings.expensesPercentageLabel);

			var nodeListForeach = function(fields, callback){
				for(var i = 0; i < fields.length; i++){
					callback(fields[i], i);
				}
			};

			nodeListForeach(fields, function(current, index){
				if(percentages[index] > 0){	
					current.textContent = percentages[index] + '%';
				}else{
					current.textContent = '----';
				}
			});
		},

		displayDates: function(){
			var now, year;
			now = new Date();
			year = now.getFullYear();
			document.querySelector(DOMStrings.yearLable).textContent = year; 
		},

		getDOMStrings: function(){
			return DOMStrings;
		}
	};

})();

var Controller = (function(BudgetCtrl, UICtrl){
	// inicjalizacija event Listenera
	var setEventListeners = function(){

		var DOM = UICtrl.getDOMStrings();

		document.querySelector(DOM.add).addEventListener('click', ctrlAddItem);
		document.addEventListener('keypress', function(event){
			if(event.keyCode === 13 || event.witch === 13){
				ctrlAddItem();
				}
			});
		document.querySelector(DOM.statusContainer).addEventListener('click', ctrlDeleteIem);
	};

	var updateBudget = function(){
		var budget;
		// 1. Izracunaj Budzet
		BudgetController.calculateBudget();
		// 2. Dohvati stanje Budzeta
		budget = BudgetController.getTotals();
		// 3. Prikazi budet u UI - u
		UIController.displayBudget(budget);
	};
	var updatePercentages = function(){

		// 1. Izracunaj postotke
		BudgetController.calculatePercentages();
		// 2. Dohvati novo izracunate postotke
		var percentages = BudgetController.getPercentages();
		// 3. Prikazi nove postotke u sucelju
		UIController.displayPercentages(percentages);
	}

	var ctrlAddItem = function(){
		var input, newItem;
		// 1. Dohvati unesene podatke
		input = UICtrl.getInputData();
		// 2.Provjeri jesu li uneseni podatci u polja i ako jesu jesu li u ispravnom formatu 
		if(input.description !== "" && !isNaN(input.value) && input.value > 0 ){

			// 3. Dodaj vrijednost u Budget Controller-u
			newItem = BudgetController.addItem(input.type, input.description, input.value);
			console.log(BudgetController.testing());
			// 4. Dodaj vrijdnost u UI
			UIController.addListItem(newItem, input.type);
			// 5. Brisi unesene vrijednost iz polja
			UIController.clearFields();
			// 6. Izracunaj Budzet
			updateBudget();
			// 7. Azuriranje postotaka
			updatePercentages();
		}
	};

	var ctrlDeleteIem = function(event){
		var itemID, splitId, type, id;
		// dohvaćanje elementa cijelog containera ( delegiranje) elementa kojeg zelimo izbrisati
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		if(itemID){
			splitId = itemID.split('-');
			type = splitId[0];
			id = parseInt(splitId[1]);
			// 1. Brisanje elementa iz niza(baze)
			BudgetController.deleteItem(type, id);
			console.log(id);
			// 2. Brisanje elementa iz korisničkog sučelja
			UIController.deleteListItem(itemID);
			// 3. Azuriranje Budzeta			
			updateBudget();
			// 4. Azuriranje postotaka
			updatePercentages(); 
		}
	};
	return {
		init: function(){
			setEventListeners();
			UIController.displayBudget({
				expenses: 0,
				income: 0,
				budget: 0,
				percentage: -1			
			});
			UIController.displayDates();
			console.log('Ovo je aplikacija');
		}
	}
	
})(BudgetController, UIController);

Controller.init();