// const dayListFrShit = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const dayListFr = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi","Dimanche"];
// const dayListFrCompact = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
// const dayListEn = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const monthListFr = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
// const monthListFrCompact = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"];
// const monthListEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysInYear = 365.25;

document.querySelector("button").addEventListener("click", function() {
    let myDay = document.getElementById("day").value;
    let myMonth = document.getElementById("month").value;
    let myYear = document.getElementById("year").value;
    buildBaseTable(myDay, myMonth, myYear);
});

// document.querySelectorAll("button").forEach((element) => {
//     element.addEventListener("click", process);
// });

let calendrier = document.getElementById("calendrier");

// function process(event) {

// }

// test();



function buildBaseTable(myDay, myMonth, myYear) {
    calendrier.innerHTML = "";
    let table = document.createElement("table");                         // create a <table> element
    let tableHeader = document.createElement("thead");                   // create a <thead> element
    let tableBody = document.createElement("tbody");                     // create a <tbody> element
    let firstDay = 1;
    let { "firstDay": firstDayThisMonth, "numberDay": numberDayThisMonth } = firstLastDays(myDay, myMonth, myYear);

    // let firstDayThisMonth = firstLastDays().firstDay;              
    // let numberDayThisMonth = firstLastDays().numberDay;
    table.setAttribute("id", "myTable")                                  // on ajoute un id à la table

    for(let i = 0; i < 7; i++) {                                         // on construit le header (qui contiendra 7 cellules)
        let headCell = document.createElement("th");                     // on créé une cellule de header <th>
        let hct = document.createTextNode(dayListFr[i]);                 // on créé un "TextNode" avec le texte du jour de la semaine correspondant à la cellule
        headCell.appendChild(hct);                                       // on ajoute le TextNode à la cellule
        tableHeader.appendChild(headCell);                               // on ajoute la cellule à <thead>
    }
    tableHeader.setAttribute("id", "tableHeader");                       // on ajoute un id au header
    tableHeader.setAttribute("class", "weekDays");                       // on ajoute une classe au header

    table.appendChild(tableHeader);                                      // on ajoute <thead> à <table>

    switch(firstDayThisMonth) {                                          // on rétablit l'ordre des jours de la semaine de façon logique
        case 0:                                                          // c'est à dire en commençant par lundi et pas par dimanche, on est plus au moyen-âge
            firstDayThisMonth = 6;
            break;
        default:
            firstDayThisMonth --;
            break;
    }

    for(let i = 0; i < 6; i++) {                                            
        let tableBodyRow = document.createElement("tr");
        
        for(let j = 0; j < 7; j++) {
            let tableBodyCell = document.createElement("td");
            
            if((i * 7 + j) >= firstDayThisMonth && firstDay <= numberDayThisMonth) {
                let ct = document.createTextNode(firstDay);
                tableBodyCell.appendChild(ct);
                firstDay++;
            }
            tableBodyRow.appendChild(tableBodyCell);
        }
        tableBody.appendChild(tableBodyRow);
    }
    table.appendChild(tableBody);
    calendrier.appendChild(table);
    table.setAttribute("border", "1px");
}

function firstLastDays(myDay, myMonth, myYear) {
    console.log(myDay + " / " + myMonth + " / " + myYear);
    let newDate = new Date(myYear + "-" + myMonth + "-" + myDay);
    console.log(newDate);
    let firstDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    let numberDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
    return { "firstDay": firstDay.getDay(), "numberDay": numberDay.getDate() };
}

function test() {

}

function bissextile(annee) {
    return !(annee % 4) || !((annee % 100) && (annee % 400));
}

function buildCalendar() {

}

function buildToolBar() {

}