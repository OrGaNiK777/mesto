
let popup = document.querySelector(".popup");
let profileEditButton = document.querySelector(".profile__edit-button");
let popupButtonSave = document.querySelector(".popup__button-save");
let popupButtonClose = document.querySelector(".popup__button-close");

function popupOpened() {
	popup.classList.add("popup__opened");
}
profileEditButton.addEventListener("click", popupOpened);

function popupClose() {
	popup.classList.remove("popup__opened");
}
popupButtonClose.addEventListener("click", popupClose);
popupButtonSave.addEventListener("click", popupClose);




let profileInfo = document.querySelector('.profile__info')

let name = document.querySelector(".popup__name");
let about = document.querySelector(".popup__about");

function handleFormSubmit (evt) {
    evt.preventDefault(); 
}

