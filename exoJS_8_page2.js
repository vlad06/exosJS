(function() {
    if(document.getElementById("btnPrevious")) {
        document.getElementById("btnPrevious").addEventListener('click', previousPage);
        var theText;
        var theNumber;
        var theUrl = location.href;
        theUrl = decodeURI(theUrl.substring(theUrl.lastIndexOf('?')));
        theNumber = theUrl.substring(theUrl.indexOf('=')+1, theUrl.indexOf('&'));
        theText = theUrl.substring(theUrl.indexOf('&')+1);
        theText = theText.substring(theText.indexOf('=')+1)
        document.getElementById("leTexte").innerHTML = theText;
        document.getElementById("leNombre").innerHTML = theNumber;
    }
}());

function previousPage() {
    console.log("dans fct previousPage()");
    // history.go(-1);
    // history.back();
    location.replace("http://127.0.0.1:5500/exoJS_8_page1.html");
}