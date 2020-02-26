(function() {
    document.getElementById("geolocate").addEventListener("click", getLocation);
    document.getElementById("txtCodeName").value = navigator.appCodeName;
    document.getElementById("txtAppName").value = navigator.appName;
    document.getElementById("txtAppVersion").value = navigator.appVersion;
    document.getElementById("txtUserAgent").value = navigator.userAgent;
}());

function getLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  document.getElementById("lat").innerHTML = position.coords.latitude;
  document.getElementById("long").innerHTML = position.coords.longitude;
}
