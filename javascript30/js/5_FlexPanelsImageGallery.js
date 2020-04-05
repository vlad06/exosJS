const panelList = document.querySelectorAll(".panel");

function toggleOpen() {
  this.classList.toggle("open");
}

function toggleOpenActive(event) {
  console.log(event.propertyName);
  if(event.propertyName.includes("flex")) {
     this.classList.toggle("open-active");
  }
 
}

panelList.forEach(panel => panel.addEventListener("click", toggleOpen));
panelList.forEach(panel => panel.addEventListener("transitionend", toggleOpenActive));
