(function() {
    if(document.getElementById("btnNext")) {
        document.getElementById("btnNext").addEventListener('click', nextPage);
    }
}());

function nextPage() {
    console.log("dans fct nextPage()");
    var theText = document.getElementById("txt").value;
    var theNumber = document.getElementById("nb").value;
    var theUrl = location.href;
    console.log(theText+", "+theNumber);
    theUrl = theUrl.substring(0,theUrl.lastIndexOf('/')+1);
    theUrl += "exoJS_8_page2.html?clé1=";
    theUrl += theNumber + "&clé2=" + theText;
    console.log(theUrl);
    location.replace(theUrl);
}
