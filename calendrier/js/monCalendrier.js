
const dayListFr = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi","Dimanche"];
const monthListFr = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

let calendrier = document.getElementById("calendrier");
let selectedMonth = document.getElementById("theMonth");
let nextMonth = document.getElementById("nextMonth");
let previousMonth = document.getElementById("previousMonth");
let calendarGenerator = document.getElementById("calendarGenerator");
let myMonth = document.getElementById("month");         // input pour récupérer un mois si saisi
let myYear = document.getElementById("year");

nextMonth.style.display = "none";
previousMonth.style.display = "none";

calendarGenerator.addEventListener("click", function() {
    nextMonth.style.display = "inline";
    previousMonth.style.display = "inline";
    calendarGenerator.style.display = "none";

    let monthYear= "";

    previousMonth.addEventListener("click", function() {
        monthYear = selectedMonth.innerHTML.split(" ");
        let { month, year } = { "month": monthListFr.indexOf(monthYear[0]) + 1, "year": Number(monthYear[1]) };

        if(month == 1) {
            buildBaseTable(12, year - 1)
        } else {
            buildBaseTable(month - 1, year);
        }
    });

    nextMonth.addEventListener("click", function() {
        monthYear = selectedMonth.innerHTML.split(" ");
        let { month, year } = { "month": monthListFr.indexOf(monthYear[0]) + 1, "year": Number(monthYear[1]) };

        if(month == 12) {
            buildBaseTable(1, year + 1)
        } else {
            buildBaseTable(month + 1, year);
        }
    });

    buildBaseTable(myMonth.value, myYear.value);
    
});



function buildBaseTable(myMonth, myYear) {
    calendrier.innerHTML = "";                                           // on reset l'affichage
    selectedMonth.innerHTML = "";
    let table = document.createElement("table");                         // create a <table> element
    let tableHeader = document.createElement("thead");                   // create a <thead> element
    let tableBody = document.createElement("tbody");                     // create a <tbody> element
    let firstDay = 1;
    let { "firstDay": firstDayThisMonth, "numberDay": numberDayThisMonth } = firstLastDays(myMonth, myYear);

    table.setAttribute("id", "myTable")                                  // on ajoute un id à la table

    for(let i = 0; i < 7; i++) {                                         // on construit le header (qui contiendra 7 cellules)
        let headCell = document.createElement("th");                     // on créé une cellule de header <th>
        let headCellText = document.createTextNode(dayListFr[i]);                 // on créé un "TextNode" avec le texte du jour de la semaine correspondant à la cellule
        headCell.appendChild(headCellText);                                       // on ajoute le TextNode à la cellule
        tableHeader.appendChild(headCell);                               // on ajoute la cellule à <thead>
    }
    tableHeader.setAttribute("id", "tableHeader");                       // on ajoute un id au header
    tableHeader.setAttribute("class", "weekDays");                       // on ajoute une classe au header

    table.appendChild(tableHeader);                                      // on ajoute <thead> à <table>

    /* on rétablit l'ordre des jours de la semaine de façon logique, c'est à dire en commençant par lundi et pas par dimanche */
    firstDayThisMonth = (firstDayThisMonth == 0) ? 6 : firstDayThisMonth - 1;

    for(let i = 0; i < 6; i++) {                                            
        let tableBodyRow = document.createElement("tr");                 // on construit 6 lignes pour la table
        
        for(let j = 0; j < 7; j++) {
            let tableBodyCell = document.createElement("td");            // pour chaque ligne on construit 7 colonnes
            tableBodyCell.setAttribute("class", "grisaille");
            if((i * 7 + j) >= firstDayThisMonth && firstDay <= numberDayThisMonth) { // on affiche uniquement les jours correspondant au mois choisit
                let cellText = document.createTextNode(firstDay);
                tableBodyCell.appendChild(cellText);
                tableBodyCell.removeAttribute("class", "grisaille");
                tableBodyCell.setAttribute("class", "active");
                tableBodyCell.addEventListener("mouseover", onMouseOver);
                tableBodyCell.addEventListener("mouseout", onMouseOut);
                tableBodyCell.addEventListener("click", actionProcess);
                firstDay++;
            }
            tableBodyRow.appendChild(tableBodyCell);
        }
        tableBody.appendChild(tableBodyRow);
    }
    table.appendChild(tableBody);
    calendrier.appendChild(table);    
}

function firstLastDays(myMonth, myYear) {
    let args = [...arguments];
    let newDate;
    if(args[0]) {
        newDate = new Date(myYear + "-" + myMonth + "-" + 1);
    } else {
        newDate = new Date();
    }
    selectedMonth.innerHTML = monthListFr[newDate.getMonth()] + " " + newDate.getFullYear();
    // console.log(newDate);
    let firstDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    let numberDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);

    return { "firstDay": firstDay.getDay(), "numberDay": numberDay.getDate() };
}

function onMouseOver(event) {
    event.target.classList.toggle("dayHover");
}

function onMouseOut(event) {
    event.target.classList.toggle("dayHover");
} 

function actionProcess(event) {
    console.log(event.target.innerText);    // servira pour ouvrir un popup pour saisir des données sur la journée choisie
}

// function bissextile(annee) {
//     return !(annee % 4) || !((annee % 100) && (annee % 400));
// }

function buildToolBar() {   // servira peut-être pour ajouter une toolBar au dessus du calendrier avec les 
                            // boutons previous et next et d'autres vues ?
}