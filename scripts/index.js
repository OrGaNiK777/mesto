let popup = document.querySelector(".popup");
let inputPopupInfo = document.getElementById("inputPopupInfo");
let profileEditButton = document.querySelector(".profile__edit-button");
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

const inputPopup = () => {
	//Редактирование, сохранение и закрытие попап
	closePopup();
	profileName.textContent = `${popupName.value}`;
	profileAbout.textContent = `${popupAbout.value}`;
	event.preventDefault();
};

profileEditButton.addEventListener("click", openedPopup);
popupButtonClose.addEventListener("click", closePopup);
inputPopupInfo.addEventListener("submit", inputPopup);
