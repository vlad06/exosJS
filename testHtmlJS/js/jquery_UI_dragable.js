$(document).ready(function($){
	
	$(".voiture").draggable({containment: "parent"});
	$(".personnage").draggable({containment: "parent"});

	$("#voiture_rouge").droppable({
		// Seul le personnage #jeanne peut monter dans la voiture rouge
		accept: "#jeanne",
		// Action effectuée lorsqu'on dépose un élément dans la voiture rouge
		drop: function(event, ui) {
			// ui.draggable désigne l'élément déplacé,
			// exemple : #jeanne ou #boby
			// On place le personnage dans la voiture (au niveau du DOM)
			ui.draggable.appendTo($(this)).css({
				// Positionnement CSS du personnage au centre de
				// la voiture
				left: "65px",
				top: "15px"
			})
			// Le personnage ne peut plus sortir de la voiture
			.draggable({containment: "parent"});
		}
	});

	// On fait pareil pour la voiture bleue
	$("#voiture_bleue").droppable({
		accept: "#jeanne, #boby",
		drop: function(event, ui) {
			//#jeanne ou #boby sont acceptés dans la voiture bleue
			ui.draggable.appendTo($(this)).css({			
				left: "25px",
				top: "60px"
			})
			.draggable({containment: "parent" });
		}
	});
});