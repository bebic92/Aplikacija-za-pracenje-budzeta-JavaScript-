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

})();

var UIController = (function(){
	var DOMStrings = {
		type: '.valueType',
		description:'.addDescription',
		value: '.addValue'
	};
	return {
		getInputData:function(){
			return{
				type: document.querySelector(DOMStrings.type).value,
				dexcription : document.querySelector(DOMStrings.description).value,
				value: document.querySelector(DOMStrings.value).value			
			};
		},
		getDOMStrings: function(){
			return DOMStrings;
		}
	};

})();

var Controller = (function(BudgetCtrl, UICtrl){
	var DOM = UICtrl.getDOMStrings();
	console.log(DOM);
	var ctrlAddItem = function(){
	// 1. Dohvati unesene podatke
	var input = UICtrl.getInputData();
	console.log(input); 
	// 2. Dodaj vrijednost u Budget Controller-u
	// 3. Dodaj vrijdnost u UI
	// 4. Izracunaj Budzet
	// 5. Prikazi budet u UI - u
	}

	document.querySelector('.addButton').addEventListener('click', ctrlAddItem);

	document.addEventListener('keypress', function(event){
		if(event.keyCode === 13 || event.witch === 13){
			ctrlAddItem();
		}
	});
	
})(BudgetController, UIController);