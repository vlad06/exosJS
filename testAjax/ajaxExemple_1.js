
var url = "infos_1.txt";
var fct = callXhr1;

document.getElementById("theButton").addEventListener("click", loadDoc.bind(null, url, fct));

function loadDoc(url, fct) {
	console.log("loadDoc");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		// console.log(xhr);
		// console.log("this.readyState : " + this.readyState);
		// console.log("this.responseUrl : " + this.responseURL);
		// console.log("this.statusText : " + this.status);
		// console.log("this.statusText : " + this.statusText);
		if (this.readyState == 4 && this.status == 200) {
			fct(this);
		}
	};
	xhr.open("GET", url, true);
	xhr.send();
}

function callXhr1(xhr) {
	console.log("callXhr1");
	document.getElementById("zoneNotif").innerHTML = xhr.responseText;
	url = "infos_2.txt";
	fct = callXhr2;
	document.getElementById("theButton").addEventListener("click", loadDoc.bind(null, url, fct));
}

function callXhr2(xhr) {
	console.log("callXhr2");
	document.getElementById("zoneNotif").innerHTML = xhr.responseText;
	url = "infos_1.txt";
	fct = callXhr1;
	document.getElementById("theButton").addEventListener("click", loadDoc.bind(null, url, fct));
}