// document.getElementById("ajax-contact").addEventListener("submit", function(event) {
//   event.preventDefault();
//   testFormField();
// });

function processingForm(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("ajaxMessage").innerHTML = theForm;
      // console.log(theForm);
      console.log(xhr);
      // console.log(xhr.response);
    }
  };
  xhr.open("GET","ajaxExemple_5_traitement.js", true);
  xhr.send();
}

function testFormField() {
  console.log("bordel");
  let theMessage = "";
  document.getElementById("errorMessage").innerHTML = theMessage;
  let theForm = document.getElementById("ajax-contact");
  let theRadios = document.getElementsByName("gender");
  let theChoice;

  for(let i = 0; i < theRadios.length; i++) {
    if(theRadios[i].checked) {
      theChoice = theRadios[i].value;
    }
  }
  if(!theChoice) {
    theMessage = "Merci de choisir un genre<br />" + theMessage;
  }
  if(theMessage) {
    document.getElementById("errorMessage").innerHTML += theMessage;
    return false;
  } else {
    // return true;
    processingForm(theForm);
  }
}

function testFormFieldOLD() {
  console.log("bordel");
  let theMessage = "";
  document.getElementById("errorMessage").innerHTML = theMessage;
  let isChecked = false;
  let theForm = document.getElementById("ajax-contact");
  for(let element of theForm){
    if(element.type == "radio") {
      if(element.checked) isChecked = true;
    }
    if(element.type == "text" && element.name == "firstName") {
      if(!element.value) {
        theMessage += "Merci de saisir votre prénom<br />";
      }
    }
    if(element.type == "text" && element.name == "lastName") {
      if(!element.value) {
        theMessage += "Merci de saisir votre nom<br />";
      }
    }
    if(element.type == "email") {
      if(!element.value) {
        theMessage += "Merci de saisir votre email<br />";
      }
    }
  }
  if(!isChecked) {
    theMessage = "Merci de choisir un genre<br />" + theMessage;
  }
  if(theMessage) {
    document.getElementById("errorMessage").innerHTML += theMessage;
  } else {
    // processingForm(theForm);
  }
}
