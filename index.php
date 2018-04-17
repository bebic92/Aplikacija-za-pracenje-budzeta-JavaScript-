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
				<option>+</option>
				<option>-</option>
			</select>
			<input type="text" name="opis" placeholder="Dodaj opis" class="addDescription">
			<input type="number" name="vrijednost" class="addValue">
			<button class="addButton"><i class="fa fa-check-circle fa-2x"></i></button>
		</div>
	</div>
	<div class="bottom">
		<div class="statusContainer clearfix">
			<div class="income"><h3>Dohodak</h3></div>
			
			<div class="expenses"><h3>Potrošnja</h3></div>

		</div>
	</div>
</body>
<script type="text/javascript" src="script.js"></script>
</html>