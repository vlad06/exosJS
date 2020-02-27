buttonChoice = document.getElementById("choice");
buttonChoice.addEventListener("mousedown", choice);
radioList = document.getElementsByName("weekOrEnd");

function choice() {
	var myChoice;
	var maxChoice = radioList.length;
	for(var i=0; i < maxChoice; i++) {
		if(radioList[i].checked) {
			myChoice=radioList[i].value;
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




