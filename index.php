<!DOCTYPE html>
<html>
<head>
	<title>Budzet Kontroler</title>

	<link rel="stylesheet" type="text/css" href="style.css">
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
</head>
<body>
	<div class="top">
		<div class="budgetContainer clearfix">

			<div class="budgetTitle">Budzet za 9 mjesec 2018</div>

			<div class="availableBudget">+ 50,000</div>

			<div class="incomeLable clearfix">
				<div class="incomeTopText">Prihodi:</div>
				<div class="right">
					<div class="incomeTopNumber">+ 4,000</div>
					<div class="incomeTopPercentage">&nbsp;</div>
				</div>
			</div>
			<div class="expensesLable clearfix">
				<div class="expensesTopText">Rashodi:</div>
				<div class="right">
					<div class="expensesTopNumber">- 4,000</div>
					<div class="expensesTopPercentage">&nbsp;</div>
				</div>
			</div>

		</div>
	</div>
	<div class="middle">
		<div class="inputContainer">
			<select class="valueType">
				<option value="inc">+</option>
				<option value="exp">-</option>
			</select>
			<input type="text" name="opis" placeholder="Dodaj opis" class="addDescription">
			<input type="number" name="vrijednost" class="addValue">
			<button class="addButton"><i class="fa fa-check-circle fa-2x"></i></button>
		</div>
	</div>
	<div class="bottom">
		<div class="statusContainer clearfix">
			<div class="income"><h3>Dohodak</h3>
<!--                         <div class="item clearfix" id="income-0">
                            <div class="item__description">Salary</div>
                            <div class="right clearfix">
                                <div class="item__value">+ 2,100.00</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div> -->
              </div>
			<div class="expenses"><h3>Potrošnja</h3></div>

		</div>
	</div>
</body>
<script type="text/javascript" src="script.js"></script>
</html>