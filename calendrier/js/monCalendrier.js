const theDayFr = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const theDayEn = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const theMonthFr = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const theMonthEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysInYear = 365.25;



theCalendrier = document.getElementById("calendrier");

let maDate = new Date();
console.log(maDate);
console.log(maDate.getDay());
console.log(theMonthFr[maDate.getMonth()]);
console.log(bissextile(maDate.getFullYear()));

function bissextile(annee) {
    return !(annee % 4) || !((annee % 100) && (annee % 400));
}
