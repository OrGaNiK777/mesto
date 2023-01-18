let popup = document.querySelector(".popup");
let profileEditButton = document.querySelector(".profile__edit-button");
// let popupButtonSave = document.querySelector(".popup__button-save");
let popupButtonClose = document.querySelector(".popup__button-close");
let popupName = document.getElementById("popupName");
let popupAbout = document.getElementById("popupAbout");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

const openedPopup = () => {
	//открытие попап
	popup.classList.add("popup_opened");
	popupName.value = profileName.textContent;
	popupAbout.value = profileAbout.textContent;
};

const closePopup = () => {
	//закрытие попап
	popup.classList.remove("popup_opened");
};

const savePopup = () => {
	popup.classList.remove("popup_opened");
	profileName.textContent = `${popupName.value}`;
	profileAbout.textContent = `${popupAbout.value}`;
};

profileEditButton.addEventListener("click", openedPopup);
popupButtonClose.addEventListener("click", closePopup);
popupButtonSave.addEventListener("click", savePopup);

function handleFormSubmit(evt) {
	evt.preventDefault();
}
