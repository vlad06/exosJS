function choice() {
	var myChoice;
	var maxChoice = 2;
	for(var i=1; i <= maxChoice; i++) {
		if(document.getElementById("radio"+i).checked) {
			myChoice=document.getElementById("radio"+i).value;
		} 
	}
	if(myChoice) {
		document.getElementById("votreChoix").style.border = "2px solid green";
		document.getElementById("votreChoix").value=myChoice;
	}
	else {
		document.getElementById("votreChoix").style.border = "2px solid red";
		document.getElementById("votreChoix").value="Merci de faire un choix!";
	}
}







