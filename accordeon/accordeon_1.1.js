let myAccordeon = document.getElementsByClassName("accordeon");

for(let i = 0; i < myAccordeon.length; i++) {
    myAccordeon[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;        // the panel variable reference the p element here
        panel.style.maxHeight = (panel.style.maxHeight) ? null : panel.scrollHeight + "rem";
    });
}

