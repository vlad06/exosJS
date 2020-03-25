
let myAccordeon = document.querySelectorAll(".accordeon");
myAccordeon.forEach((element) => {
    element.addEventListener("click", process);
})

function process(event) {
    let theTarget = event.target;                                                   // on sauvegarde l'élément d'où à été fait le clic
    
    if(theTarget.parentNode.classList.contains("accordeon")) {                      // si le clic à été fait depuis un élément enfant à la classe accordeon
        theTarget = event.target.parentNode;                                        // on force l'élément appelant à être son parent
    }
    let panel = theTarget.nextElementSibling ;                                      // pour que la variable panel cible le panel et pas un enfant de l'img ou du span
    theTarget.classList.toggle("active");                                           // on ajoute ou enlève .active à l'élément cliqué

    panel.style.display = (panel.style.display === "block") ? "none" : "block";     // Pour afficher ou cacher la div .panel

    /* Ce qui suit ne sert qu'a l'animation du couteau lors du clic sur le panel 1 */
    if(theTarget.firstChild.innerHTML == "Panel 1" ) {                              // on lance le couteau uniquement si on a à faire à un clic sur le panel1
        if(theTarget.classList.contains("active")) {
            let increment = 25;
            let numImage = 1;
            moveKnife = setInterval(function() {
                theImage = document.getElementById("theKnife");
                theImage.style.position = "relative";

                /* Si la position de l'image est inférieure à la position maximale de son conteneur moins la taille de l'icône et du titre */
                if(Number(theImage.style.left.substring(0,theImage.style.left.length - 2)) < theImage.parentNode.clientWidth - 230) {
    
                    /* Le bloc qui suit est là pour assurer l'animation du couteau ( sur 8 frames) */
                    if(numImage == 8) {                                   // si on en est au dernier frame
                        numImage = 1;                                     // on revient au premier
                    } else {    
                        /* on change l'adresse de l'image à la volée */
                        theImage.src = theImage.src.substr(0, 27) + numImage + theImage.src.substring(28, theImage.src.length);
                        numImage++;                                      // on se prépare à afficher l'image suivante
                    }
                    theImage.style.left = increment + "px";              // on affiche l'image à son nouvel emplacement
                    increment += 20;
                } else {                                                 // si on dépasse la taille du div qui contient le couteau,
                    clearInterval(moveKnife);                             // on arrête le timer
                    theImage.src = "knife2t.png";                        // on affiche la deuxième image (comme si le couteau était planté^^)
                    theImage.style.left = theImage.parentNode.clientWidth - 230 + "px"; // on affiche l'image au "bout" du div (c'est plus propre)
                }
            }, 25);                                                     // le timer change le frame et sa position toutes les 25ms
        } else {                                                        // si le panel n'est plus "actif"
            clearInterval(moveKnife);                                   // on arrête le timer d'animation
            theImage.src = "knife1t.png";                               // on réinitialise l'adresse de l'image
            theImage.style.position = "relative";                       // puis sa position
            theImage.style.left = "0px";
        }
    }
}
