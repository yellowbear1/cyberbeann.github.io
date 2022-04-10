let welcomePageContainer = document.querySelector("#welcome__container");
let welcomeButton = document.querySelector("#welcome__page__button");
export let selectDestPageContainer = document.querySelector("#select__dest__container");
let ARbutton = document.querySelector("#goCamera");
export let ARCameraPageContainer = document.querySelector("#AR__container");
let ARtoSelect = document.querySelector("#back");
let homeButton = document.querySelector("#home__button");

const leaveWelcomePage = (e) => {
  welcomePageContainer.style.transform = "translateX(-90%)";
  welcomePageContainer.addEventListener("transitionend", ()=>{welcomePageContainer.style.display="none"})

  selectDestPageContainer.style.transform = "translateX(0)";
  selectDestPageContainer.style.display = "block"
}

const goARCamera = (e) => {
  selectDestPageContainer.style.transform = "translateX(-90%)";
  selectDestPageContainer.addEventListener("transitionend", ()=>{welcomePageContainer.style.display="none"})
  selectDestPageContainer.style.display = "none";

  ARCameraPageContainer.style.transform = "translateX(0)";
  ARCameraPageContainer.style.display = "block"
}

const ARCamToSelectDest = (e) => {
  ARCameraPageContainer.style.transform = "translateX(-90%)";
  ARCameraPageContainer.addEventListener("transitionend", ()=>{welcomePageContainer.style.display="none"})
  ARCameraPageContainer.style.display = "none";

  selectDestPageContainer.style.transform = "translateX(0)";
  selectDestPageContainer.style.display = "block"
}

const goHome = () => {
  location.reload();
}


// on render
window.addEventListener('DOMContentLoaded', ()=>{
  selectDestPageContainer.style.display = "none";
  ARCameraPageContainer.style.display = "none";
})


// Event Listeners
welcomeButton.addEventListener('click', leaveWelcomePage);
ARbutton.addEventListener('click', goARCamera);
back.addEventListener('click', ARCamToSelectDest);
