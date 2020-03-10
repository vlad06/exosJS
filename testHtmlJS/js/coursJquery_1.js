$(document).ready(function() {
	
	// $("#handle").click(function(e) {
		// var texte = "<br/>Texte de remplacement";
		// $("#mon_element").html(texte);
	// })
	// var new_element = $("<div>X</div>");
	// new_element.css({
		// background: "red",
		// width: "30px",
		// height: "30px"
	// });
	// $("a").append(new_element);
	// $("body").append(new_element);
	
	$("#handle").click(function(e) {
		e.preventDefault();								//on désactive le lien
		
		$("#output").html("")
			.append("<i>attrubut target</i>:" + $(this).attr("target") + "<br />")
			.append("<i>attribut rel   </i>:" + $(this).attr("rel") + "<br />")
			.append("<i>attribut title </i>:" + $(this).attr("title") + "<br />")
			.append("<i>attrubut style </i>:" + $(this).attr("style") + "<br />")
	});
	
	$("#liste-films div b").click(function(e) {
		$(this).parent().remove();
	});
	
	$("#handle-liste-films").click(function(e) {		//si on clic sur le lien Ajouter
		e.preventDefault();
		if($("#inputTexte").val() != "") {
			var texte = $("#inputTexte").val();
			$("#inputTexte").val("");
			var nouvelleLigne = $("<div><span>" + texte + "</span> - <b>supprimer cette ligne</b></div>");
		
		nouvelleLigne.children("b").click(function(e) {
			nouvelleLigne.remove();
		});
		}
		
		$("#liste-films").append(nouvelleLigne);
	});
	
	$("#liste-films div .vider").click(function(e) {
		$(this).siblings("div").remove();
	});	
});
