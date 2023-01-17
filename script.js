let popup = document.querySelector(".popup");
let profileEditButton = document.querySelector(".profile__edit-button");
let popupButtonSave = document.querySelector(".popup__button-save");
let popupButtonClose = document.querySelector(".popup__button-close");
let popupName = document.querySelector(".popup__name");
let popupAbout = document.querySelector(".popup__about");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");


function popupOpened() {
	popup.classList.add("popup__opened");
	popupName.value = profileName.textContent;
	popupAbout.value = profileAbout.textContent;
}

function popupClose() {
	popup.classList.remove("popup__opened");
}

profileEditButton.addEventListener("click", popupOpened);
popupButtonClose.addEventListener("click", popupClose);
// popupButtonSave.addEventListener("click", popupClose);

function handleFormSubmit(evt) {
	evt.preventDefault();
}
	profileName.textContent = (`${popupName}`)
	profileAbout.textContent = (`${123}`)



popup.addEventListener('submit', handleFormSubmit); 
